const electron = require('electron')
const app = electron.app
const nativeImage = electron.nativeImage
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const fs = require('fs')

let mainWindow
let icon = nativeImage.createFromPath(path.join(__dirname, 'assets','img', 'icons', 'icon.png'))

function createWindow() {
	//BrowserWindow.addDevToolsExtension('./extensions/angular-batarang');

	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		frame: false,
		minWidth: 250,
		minHeight: 200,
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

	mainWindow.webContents.openDevTools()

	mainWindow.on('closed', () => {
		mainWindow = null
	})

	mainWindow.setAlwaysOnTop(true)
}
console.log(path.join(__dirname));
if(process.platform === 'darwin') {
	let pluginPath = path.join(__dirname, 'plugins', 'widevinecdmadapter.plugin')
	pluginPath = fs.existsSync(pluginPath)?pluginPath:path.join(__dirname, '../', 'plugins', 'widevinecdmadapter.plugin')
	app.commandLine.appendSwitch('widevine-cdm-path', pluginPath)
	app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.903')
} else if(process.platform === 'linux') {
	let pluginPath = path.join(__dirname, 'plugins', 'libwidevinecdmadapter.so')
	pluginPath = fs.existsSync(pluginPath)?pluginPath:path.join(__dirname, '../', 'plugins', 'libwidevinecdmadapter.so')
	app.commandLine.appendSwitch('widevine-cdm-path', pluginPath)
	app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.903')
	app.commandLine.appendSwitch('enable-transparent-visuals')
	app.commandLine.appendSwitch('disable-gpu')
} else if(/^win/.test(process.platform)) {
	let pluginPath = path.join(__dirname, 'plugins', 'widevinecdmadapter.dll')
	pluginPath = fs.existsSync(pluginPath)?pluginPath:path.join(__dirname, '../', 'plugins', 'widevinecdmadapter.dll')
	app.commandLine.appendSwitch('widevine-cdm-path', pluginPath)
	app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.903')
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
