const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 522,
        resizable: false,
        //icon: null
    })


    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    })
    mainWindow.loadURL(startUrl)
    mainWindow.on('closed', () => {
        mainWindow = null
        //NetworkTables.disconnect()
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if(mainWindow === null) {
        createWindow()
    }
})
