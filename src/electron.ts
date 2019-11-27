import {app, BrowserWindow, ipcMain} from 'electron'
import * as wpilib_NT from 'wpilib-nt-client'

const client = new wpilib_NT.Client()
client.setReconnectDelay(1000) // The client will try to reconnect after 1 second

let connectedFunc, ready = false // COME BACK

function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        //icon: null,
        webPreferences: {
            nodeIntegration: true
        }
    })
    // and load the index.html of the app.
    win.loadFile('index.html')

    const clientDataListener = (key, val, valType, mesgType, id, flags) => {
        if(val === 'true' || val === 'false') {
            val = val === 'true'
        }
        win.webContents.send(mesgType, {key, val, valType, id, flags})
    }

    // Attempt to connect to the localhost
    client.start((con, err) => {
        let connectFunc = () => {
            console.log('Sending status')
            win.webContents.send('connected', con)
            // Listens to the changes coming from the client
        }
        // If the Window is ready than send the connection status to it
        if(ready) {
            connectFunc()
        }
        connectedFunc = connectFunc
    })
    
    ipcMain.on('ready', (ev, mesg) => {
        console.log('NetworkTables is ready')
        ready = win != null

        // Remove old Listener
        client.removeListener(clientDataListener)

        // Add new listener with immediate callback
        client.addListener(clientDataListener, true)

        // Send connection message to the window if if the message is ready
        if(connectedFunc) connectedFunc()
    })
    // When the user chooses the address of the bot than try to connect
    ipcMain.on('connect', (ev, address, port) => {
        console.log(`Trying to connect to ${address}` + (port ? ':' + port : ''))
        let callback = (connected, err) => {
            console.log('Sending status')
            win.webContents.send('connected', connected)
        }
        if(port) {
            client.start(callback, address, port)
        } else {
            client.start(callback, address)
        }
    })
    ipcMain.on('add', (ev, mesg) => {
        client.Assign(mesg.val, mesg.key, (mesg.flags & 1) === 1)
    })
    ipcMain.on('update', (ev, mesg) => {
        client.Update(mesg.id, mesg.val)
    })
    ipcMain.on('windowError', (ev, error) => {
        console.log(error)
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
    console.log('App is ready')
    createWindow()
})

app.on('quit', function () {
    console.log('Application quit.')
})