const electron = require('electron')
const app = electron.app
const nativeImage = electron.nativeImage
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow
let icon = nativeImage.createFromPath(path.join(__dirname, 'img', 'icons', '32x32.png'))

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800, 
    height: 600,
    frame: false,
    transparent: true,
    icon: icon,
    webPreferences: {
      plugins: true
    }
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  //mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  mainWindow.setAlwaysOnTop(true)
}

if(process.platform === 'darwin') {
  app.commandLine.appendSwitch('widevine-cdm-path', './plugins/widevinecdmadapter.plugin')
  app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.903')
} else if(process.platform === 'linux') {
  app.commandLine.appendSwitch('widevine-cdm-path', './plugins/libwidevinecdmadapter.so')
  app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.903')
  app.commandLine.appendSwitch('enable-transparent-visuals')
  app.commandLine.appendSwitch('disable-gpu')
} else if(/^win/.test(process.platform)) {
  app.commandLine.appendSwitch('widevine-cdm-path', './plugins/widevinecdmadapter.dll')
  app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.903')
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})