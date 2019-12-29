import {useState, useEffect} from 'react'
import NetworkTables from './NetworkTables'

export default function useNetworkTable(key: string, initalValue?: any) {
    let [networkKey, setNetworkKey] = useState(key)
    let [value, setValue] = useState(initalValue)
    let [listenerID, setListenerID] = useState()

    useEffect(() => {
        // get value
        NetworkTables.addKeyListener(`/SmartDashboard/${networkKey}`, message => {
            setValue(message.value)
        })
        /*
        if(listenerID) NetworkTables.removeKeyListener(networkKey, listenerID)

        let id = NetworkTables.addKeyListener(`/SmartDashboard/${networkKey}`, newValue => {
            setValue(newValue)
        })
        setListenerID(id)

        return () => {
            NetworkTables.removeKeyListener(networkKey, listenerID)
        }
        */
    }, [networkKey, listenerID])

    useEffect(() => {
        // put value
        if(value !== NetworkTables.getValue(networkKey)) {
            NetworkTables.putValue(`/SmartDashboard/${networkKey}`, value)
        }
    }, [value, networkKey])

    return [
        value,
        setValue,
        setNetworkKey
    ]
}