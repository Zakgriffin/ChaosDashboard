import * as React from 'react'
import './App.css'
import TimeMeter from '../TimeMeter/TimeMeter'
import Suction from '../Suction/Suction'
import Gyro from '../Gyro/Gyro'
import Connection from '../Connection/Connection'
import Simulation from '../Simulation/Simulation'
//import Login from '../Login/Login'

import NetworkTables from '../../network/networktables'
import Draggable from '../Draggable'
//import DragToggle from '../DragToggle'

interface IProps {}
interface IState {
    teamNumber: number,
    connecting: boolean,
    connected: boolean
}

export default function App() {
    let [teamNumber, setTeamNumber] = React.useState(0),
        [connecting, setConnecting] = React.useState(false),
        [connected, setConnected] = React.useState(false)

    React.useEffect(() => {
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
    return (
        <div id = 'App'>
            <TimeMeter/>
            <Suction/>
            
            <Connection
                teamNumber={teamNumber}
                connected={connected}
                disconnect={disconnect}
            />
            <Simulation/>
            <Draggable>
                <Gyro/>
            </Draggable>
        </div>
    )
}



/*
<Draggable>
    <div x = {20}>Thing</div>
    <div width={400}>Thing</div>
    <DragToggle/>
</Draggable>
*/