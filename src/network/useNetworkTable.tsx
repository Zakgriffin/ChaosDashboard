import {useState, useEffect} from 'react'
import NetworkTables from './networktables'

export default function useNetworkTable(key: string, initalValue?: any) {
    let [networkKey, setNetworkKey] = useState(key)
    let [value, setValue] = useState(initalValue)
    useEffect(() => {
        NetworkTables.addKeyListener(`/SmartDashboard/${networkKey}`, newValue => {
            setValue(newValue)
        })
    }, [])

    useEffect(() => {
        if(value /*!= newValue*/) {
            NetworkTables.putValue(`/SmartDashboard/${networkKey}`, value)
        }
        setTimeout(() => {
            setValue(value + 1)
        }, 100)
    }, [value])

    return [
        value,
        setValue,
        setNetworkKey
    ]
}