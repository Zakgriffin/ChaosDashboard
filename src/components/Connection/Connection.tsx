import React, {useState} from 'react'
import ConnectStatus from '../ConnectStatus/ConnectStatus'
import Login from './Login/Login'

import NetworkTables from '../../network/NetworkTables'

export default function Connection() {
    const [teamNumber, setTeamNumber] = useState(),
        [connected, setConnected] = useState(false),
        [connecting, setConnecting] = useState(false)

    const disconnect = () => {
        setConnected(false)
        NetworkTables.disconnect()
    }

    const tryLogin = (connectTeamNumber: number) => {
        setConnecting(true)
        NetworkTables.tryToConnect(`roborio-${connectTeamNumber}-frc.local`, (con) => {
            setConnecting(false)
            if(con) {
                setConnected(true)
                setTeamNumber(connectTeamNumber)
            }
        })
    }

    return <>
        <ConnectStatus
        />
        { connected ? null :
        <Login
            connecting={connecting}
            tryLogin={tryLogin}
        />
        }
    </>
}
/*
let [teamNumber, setTeamNumber] = React.useState(0),
//[connecting, setConnecting] = React.useState(false),
[connected, setConnected] = React.useState(false)

useEffect(() => {
NetworkTables.addConnectionListener((connected) => {
    setConnected(connected)
})
}, [])

let tryLogin = (teamNumber: number) => {
setConnecting(true)
setTeamNumber(teamNumber)
let address = `roborio-${teamNumber}-frc.local`
NetworkTables.tryToConnect(address)
setTimeout(() => {
    setConnecting(false)
}, 2000)
}

let disconnect = () => {
setConnected(false)
setTeamNumber(0)
}

//let login = !connected ? <Login tryLogin={tryLogin} connecting={connecting}/> : undefined
*/