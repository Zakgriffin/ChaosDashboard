import {app, BrowserWindow} from 'electron'
import NetworkTables from './network/networktables'

app.on('ready', () => {
    let win = new BrowserWindow({
        width: 1280,
        height: 532,
        resizable: false,
        //icon: null,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile('index.html')

    win.on('closed', () => {
        NetworkTables.disconnect()
    })

    console.log('App Ready')
})

app.on('quit', () => {
    console.log('App Quit')
})