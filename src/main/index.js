'use strict'

import { app, BrowserWindow } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
// const winURL = process.env.NODE_ENV === 'development'
//   ? `http://localhost:9080`
//   : `file://${__dirname}/index.html`

const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080/#/login-window'
  : `file://${__dirname}/index.html#login-window`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    frame: false,
    width: 1280,
    height: 720,
    minWidth: 1220,
    minHeight: 550
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

// ipcMain.on('ask-login', askKeyEvent => {
//   let askLoginPrompt = new BrowserWindow({
//     width: 500,
//     height: 500,
//     parent: mainWindow,
//     modal: true,
//     frame: false,
//     resizable: false
//   })
//   askLoginPrompt.loadURL(
//     process.env.NODE_ENV === 'development'
//       ? 'http://localhost:9080/#/login-window'
//       : `file://${__dirname}/index.html#login-window`
//   )

//   // ipcMain.once('set-key', (setKeyEvent, setKeyArgu) => {
//   //   askKeyPrompt.close();
//   //   askKeyPrompt = null;
//   //   askKeyEvent.sender.send('reply-ask-key', setKeyArgu);
//   // });
// })

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
