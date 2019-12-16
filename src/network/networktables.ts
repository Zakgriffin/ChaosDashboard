import * as wpilib_NT from 'wpilib-nt-client'

const client = new wpilib_NT.Client()
client.setReconnectDelay(1000)

let keys: {[key: string]: {id: any, val: any}} = {},
    connectionListeners: {(connected: boolean): void} [] = [],
    globalListeners: {(value: string): void} [] = [],
    keyListeners: {[key: string]: [(value: string) => void]} = {},
    robotAddress: string = ''

const clientListener = client.addListener((key, value/*, valType, mesgType, id, flags*/) => {
    globalListeners.map(listenerCallback => listenerCallback(value))
    if(keyListeners[key]) {
        keyListeners[key].map(listenerCallback => listenerCallback(value))
    }
})


const NetworkTables = {
    /**
     * Sets a function to be called when the robot connects/disconnects to the pynetworktables2js server via NetworkTables. It will also be called when the websocket connects/disconnects.
     *
     * When a listener function is called with a ‘true’ parameter, the NetworkTables.getRobotAddress() function will return a non-null value.
     * @param callback a function that will be called with a single boolean parameter that indicates whether the robot is connected
     */
    addConnectionListener(callback: (connected: boolean) => any): void {
        connectionListeners.push(callback)
    },

    /**
     * Set a function that will be called whenever any NetworkTables value is changed
     * @param callback When any key changes, this function will be called with the following parameters key: key name for entry, value: value of entry, isNew: If true, the entry has just been created
     */
    addGlobalListener(callback: (value: any) => any) : void {
        globalListeners.push(callback)
    },

    /**
     * Set a function that will be called whenever a value for a particular key is changed in NetworkTables
     * @param key A networktables key to listen for
     * @param callback When the key changes, this function will be called with the following parameters key: key name for entry, value: value of entry, isNew: If true, the entry has just been created
     */
    addKeyListener(key: string, callback: (value: any) => void) : void {
        if(typeof keyListeners[key] != 'undefined') {
            keyListeners[key].push(callback)
        } else {
            keyListeners[key] = [callback]
        }
    },

    /**
     * Use this to test whether a value is present in the table or not
     * @param key A networktables key
     * @returns true if a key is present in NetworkTables, false otherwise
     */
    containsKey(key: string) : boolean {
        return key in keys
    },

    /**
     * Get all keys in the NetworkTables
     * @returns all the keys in the NetworkTables
     */
    getKeys(): string[] {
        return Object.keys(keys)
    },

    /**
     * Returns the value that the key maps to. If the websocket is not open, this will always return the default value specified.
     * @param key A networktables key
     * @returns value of key if present, undefined or defaultValue otherwise
     */
    getValue(key: string): any {
        if(typeof keys[key] != 'undefined') {
            return keys[key].val
        }
    },

    /**
     * @returns null if the robot is not connected, or a string otherwise
     */
    getRobotAddress(): string {
        return client.isConnected() ? robotAddress : ''
    },

    /**
     * @returns true if the robot is connected
     */
    isRobotConnected(): boolean {
        return client.isConnected()
    },

    /**
     * Sets the value in NetworkTables. If the websocket is not connected, the value will be discarded.
     * @param key A networktables key
     * @param value The value to set (see warnings)
     */
    putValue(key: string, value: any): void {
        if(!client.isConnected()) return

        if(typeof keys[key] != 'undefined') {
            client.Update(keys[key].id, value)
        }
        else {
            client.Assign(value, key) //(mesg.fzlags & 1) === 1
        }
    },

    /**
     * Escapes special characters and returns a valid jQuery selector. Useful as NetworkTables does not really put any limits on what keys can be used.
     * @param key A networktables key
     * @returns Escaped value
     */
    keySelector(key: string): any {
        return encodeURIComponent(key).replace(/([&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, '\\$1')
    },

    /**
     * Attempt a connection to the robot
     * @param address Address to connect to
     * @param port Optional port
     */
    tryToConnect(address: string, port?: number): void {
        console.log(`Trying to connect to ${address}` + (port ? ':' + port : ''))
        let callback = (con: boolean, err: any) => {
            connectionListeners.map(listenerCallback => listenerCallback(con))
            if(err) console.log(err)
            if(con) robotAddress = address
        }
        if(port) {
            client.start(callback, address, port)
        } else {
            client.start(callback, address)
        }
    },

    /**
     * Disconnects from the robot
     */
    disconnect(): void {
        client.removeListener(clientListener)
    }
}

export default NetworkTables