import {app, BrowserWindow, ipcMain} from 'electron'
import NetworkTables from './network/networktables'

function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        //icon: null,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile('index.html')

    ipcMain.on('windowError', (ev, error) => {
        console.log(error)
    })

    win.on('closed', () => {
        NetworkTables.disconnect()
    })
}

app.on('ready', () => {
    console.log('App is ready')
    createWindow()
})

app.on('quit', function () {
    console.log('Application quit.')
})