import {useState, useEffect} from 'react'
import NetworkTables from './networktables'

export default function useNetworkTable(key: string, initalValue?: any) {
    let [networkKey, setNetworkKey] = useState(key)
    let [value, setValue] = useState(initalValue)
    useEffect(() => {
        NetworkTables.addKeyListener(`/SmartDashboard/${networkKey}`, newValue => {
            setValue(newValue)
        })
    }, [networkKey])

    useEffect(() => {
        if(value /*!= newValue*/) {
            NetworkTables.putValue(`/SmartDashboard/${networkKey}`, value)
        }
    }, [value, networkKey])

    return [
        value,
        setValue,
        setNetworkKey
    ]
}