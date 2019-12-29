import * as wpilib_NT from 'wpilib-nt-client'

const client = new wpilib_NT.Client()
client.setReconnectDelay(1000)

interface IMessageData {
    key: string
    value: any
    valType: String
    mesgType: 'add' | 'delete' | 'update' | 'flagChange'
    id: number
    flags: number
}

type ConnectionListener = (connected: boolean) => void
type MessageListener = (data: IMessageData) => void

let connectionListeners: ConnectionListener[] = [],
    globalListeners: MessageListener[] = [],
    keyListeners: {[key: string]: MessageListener[]} = {},
    robotAddress: string = ''
/*
setInterval(() => {
    console.log(connectionListeners, globalListeners, keyListeners)
}, 1000)
*/
const clientListener = client.addListener((key, value, valType, mesgType, id, flags) => {
    let data: IMessageData = {key, value, valType, mesgType, id, flags}
    globalListeners.map(listener => listener(data))
    if(keyListeners[key]) {
        keyListeners[key].map(listener => listener(data))
    }
})


const NetworkTables = {
    /**
     * Sets a function to be called when the robot connects/disconnects to the pynetworktables2js server via NetworkTables. It will also be called when the websocket connects/disconnects.
     *
     * When a listener function is called with a ‘true’ parameter, the NetworkTables.getRobotAddress() function will return a non-null value.
     * @param listener a function that will be called with a single boolean parameter that indicates whether the robot is connected
     */
    addConnectionListener(listener: ConnectionListener): void {
        connectionListeners.push(listener)
    },

    /**
     * Set a function that will be called whenever any NetworkTables value is changed
     * @param listener When any key changes, this function will be called with the following parameters key: key name for entry, value: value of entry, isNew: If true, the entry has just been created
     */
    addGlobalListener(listener: MessageListener): void {
        globalListeners.push(listener)
    },

    /**
     * Set a function that will be called whenever a value for a particular key is changed in NetworkTables
     * @param key A networktables key to listen for
     * @param listener When the key changes, this function will be called with the following parameters key: key name for entry, value: value of entry, isNew: If true, the entry has just been created
     */
    addKeyListener(key: string, listener: MessageListener): void {
        if(!keyListeners[key]) keyListeners[key] = []
        keyListeners[key].push(listener)
    },

    removeKeyListener(key: string, listener: MessageListener): void {
        if(!keyListeners[key]) throw new Error(`No listeners under the key: ${key}`)
        keyListeners[key] = keyListeners[key].filter(l => l !== listener)
    },

    /**
     * Use this to test whether a value is present in the table or not
     * @param key A networktables key
     * @returns true if a key is present in NetworkTables, false otherwise
     */
    containsKey(key: string): boolean {
        return key in client.getKeys()
    },

    /**
     * Get all keys in the NetworkTables
     * @returns all the keys in the NetworkTables
     */
    getKeys(): string[] {
        return client.getKeys()
    },

    /**
     * Returns the value that the key maps to. If the websocket is not open, this will always return the default value specified.
     * @param key A networktables key
     * @returns value of key if present, undefined or defaultValue otherwise
     */
    getValue(key: string): any {
        return client.getEntry(client.getKeyID(key))
    },

    /**
     * @returns null if the robot is not connected, or a string otherwise
     */
    getRobotAddress(): string {
        return robotAddress
    },

    /**
     * @returns true if the robot is connected
     */
    isConnected(): boolean {
        return client.isConnected()
    },

    /**
     * Sets the value in NetworkTables. If the websocket is not connected, the value will be discarded.
     * @param key A networktables key
     * @param value The value to set (see warnings)
     */
    putValue(key: string, value: any): void {
        if(!client.isConnected()) return

        let id = client.getKeyID(key)
        if(id) client.Update(id, value)
        else client.Assign(value, key)
    },

    /**
     * Escapes special characters and returns a valid jQuery selector. Useful as NetworkTables does not really put any limits on what keys can be used.
     * @param key A networktables key
     * @returns Escaped value
     */
    keySelector(key: string): any {
        return encodeURIComponent(key).replace(/([&,.+*~':'!^#$%@[]()=>\|])/g, '\\$1')
    },

    /**
     * Attempt a connection to the robot
     * @param address Address to connect to
     * @param port Optional port
     */
    tryToConnect(address: string, onCon: (con: boolean) => void, port?: number): void {
        console.log(`Trying to connect to ${address}` + (port ? ':' + port : ''))

        let callback = (con: boolean, err: any) => {
            onCon(con)
            connectionListeners.map(listenerCallback => listenerCallback(con))
            if(err) console.error(err)
            if(con) robotAddress = address
        }

        if(port) client.start(callback, address, port)
        else client.start(callback, address)
    },

    /**
     * Disconnects from the robot
     */
    disconnect(): void {
        client.removeListener(clientListener)
    }
}

export default NetworkTables