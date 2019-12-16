import * as React from 'react';
import './Connection.css'

interface IProps {
    connected: boolean
    disconnect: () => void
    teamNumber: number
    teamColor?: string
}
interface IState {
    teamColor: string
}

export default class Connection extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            teamColor: props.teamColor || '#4a86e8',
        }
    }

    render() {
        let s = this.state
        let p = this.props
        let disconnectButton = p.connected ?
            <button id='connection-disconnect' onClick={this.props.disconnect}>Exit</button> : undefined

        return (
            <div id='connection'>
                <button id = 'connection-indicator'>
                    <span style={{color: p.connected ? 'white' : 'red'}}>
                        {p.connected ? 'Connected To ' : 'Robot Disconnected'}
                    </span>
                    <span style={{color: s.teamColor}}>
                        {p.connected ? p.teamNumber : ''}
                    </span>
                </button>
                {disconnectButton}
            </div>
        )
    }
}