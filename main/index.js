const { app, BrowserWindow } = require('electron')
const log = require('electron-log')
const { autoUpdater } = require('electron-updater')

autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info'
log.info('App starting...')

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...')
})
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.')
})
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.')
})
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err)
})
autoUpdater.on('download-progress', (progressObj) => {
  let logMessage = 'Download speed: ' + progressObj.bytesPerSecond
  logMessage = logMessage + ' - Downloaded ' + progressObj.percent + '%'
  logMessage =
    logMessage + ' (' + progressObj.transferred + '/' + progressObj.total + ')'
  sendStatusToWindow(logMessage)
})
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded')
})

function sendStatusToWindow(text) {
  log.info(text)
}

let win

function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 600
  })
  if (process.argv.find((arg) => arg === '--debug')) {
    win.loadURL('http://localhost:8080')
  } else {
    win.loadFile('./public/index.html')
  }
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('ready', async () => {
  autoUpdater.checkForUpdatesAndNotify()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
