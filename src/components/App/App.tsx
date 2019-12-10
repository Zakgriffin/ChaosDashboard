import * as React from 'react'
import './App.css'
import TimeMeter from '../TimeMeter/TimeMeter'
import Suction from '../Suction/Suction'
import Gyro from '../Gyro/Gyro'
import Connection from '../Connection/Connection'
import Simulation from '../Simulation/Simulation'
import Login from '../Login/Login'

import NetworkTables from '../../network/networktables'

interface IProps {}
interface IState {
    teamNumber: number,
    connecting: boolean,
    connected: boolean
}

export default class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            teamNumber: undefined,
            connecting: false,
            connected: false
        }
    }

    componentDidMount = () => {
        NetworkTables.addConnectionListener((connected) => {
            this.setState({
                connected: connected
            })
        })
    }

    tryLogin = (teamNumber) => {
        this.setState({
            connecting: true,
            teamNumber
        })
        let address = `roborio-${teamNumber}-frc.local`
        NetworkTables.tryToConnect(address)
        setTimeout(() => {
            this.setState({connecting: false})
        }, 2000)
        /*
        setTimeout(() => {
            this.setState({
                teamNumber,
                connecting: false,
                connected: true
            })
        }, 1000)
        */
    }

    disconnect = () => {
        this.setState({
            connected: false,
            teamNumber: undefined
        })
    }

    render() {
        let login = !this.state.connected ? <Login tryLogin={this.tryLogin} connecting={this.state.connecting}/> : undefined
        return (
            <div id = 'App'>
                <TimeMeter/>
                <Suction/>
                <Gyro/>
                <Connection
                    teamNumber={this.state.teamNumber}
                    connected={this.state.connected}
                    disconnect={this.disconnect}
                />
                <Simulation/>
                {login}
            </div>
        )
    }
}