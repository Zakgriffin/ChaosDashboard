import React, { useContext } from 'react';
import './ConnectStatus.css'
import {ThemeContext} from '../../contexts/ThemeContext'
import {ConnectionContext} from '../../contexts/ConnectionContext'

export default function ConnectStatus() {
    const {theme} = useContext(ThemeContext)
    const {widget, text, trafficColors} = theme

    const {connection, dispatchConnection} = useContext(ConnectionContext)
    const {connected, teamInfo} = connection

    console.log(connection)

    return <div className='connect-status'>
        {/* state */}
        <div className='connect-status-info connect-status-state'
            style={{background: widget}}
        >
            <span style={{color: connected ? text : 'red'}}>
                {connected ? 'Connected To ' : 'Disconnected'}
            </span>
            <span style={{color: teamInfo.color}}>
                {connected ? teamInfo.number : ''}
            </span>
        </div>
        {/* team name */}
        <div className='connect-status-info connect-status-team-name'
            style={{background: widget, color: teamInfo.color}}
        >
            {connected ? teamInfo.name : 'No Team Set'}
        </div>
        {/* logo and disconnect */}
        <div className='connect-status-left-items'>
            <button className='connect-status-disconnect' style={{
                background: widget,
                color: connected ? 'red' : trafficColors.green
            }}
                onClick={() => {
                    if(connected) dispatchConnection({type: 'DISCONNECT'})
                }}>
                {connected ? 'Disconnect' : 'Connect'}
            </button>

            {/* <Logo className='connect-status-logo'/> */}
        </div>
    </div>
}