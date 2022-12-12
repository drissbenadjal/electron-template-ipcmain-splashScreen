const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path')

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 1280,
    minWidth: 1280,
    height: 720,
    minHeight: 720,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.setMenuBarVisibility(false)
  win.loadFile('public/main/index.html')

  
  const splash = new BrowserWindow({
    width: 650,
    maxWidth: 650,
    height: 350,
    maxHeight: 350,
    // transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  splash.loadFile('public/splash/index.html')

  win.once('ready-to-show', () => {
      setTimeout(() => {
          splash.destroy();
          win.show();
      }, 3000);
  });

  ipcMain.on('close', () => {
    console.log('leave');
    app.quit();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})