import {app, BrowserWindow} from 'electron'
import NetworkTables from './network/networktables'

app.on('ready', () => {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
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