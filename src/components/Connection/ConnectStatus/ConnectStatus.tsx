import React from 'react';
import './ConnectStatus.css'

interface IProps {
    connected: boolean
    teamNumber: number
    disconnect: () => void
}

export default function ConnectStatus(props: IProps) {
    let disconnectButton = props.connected ?
        <button id='connection-disconnect'
            onClick={props.disconnect}>
            Exit
        </button> : null

    return (
        <div id='connection'>
            <button id = 'connection-indicator'>
                <span style={{color: props.connected ? 'white' : 'red'}}>
                    {props.connected ? 'Connected To ' : 'Robot Disconnected'}
                </span>
                <span style={{color: '#f0f'}}>
                    {props.connected ? props.teamNumber : ''}
                </span>
            </button>
            {disconnectButton}
        </div>
    )
}