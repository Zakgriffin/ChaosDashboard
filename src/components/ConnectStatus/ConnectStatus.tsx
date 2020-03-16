import React, { useContext } from 'react';
import './ConnectStatus.css'
import {ThemeContext} from '../../contexts/ThemeContext'
import {ConnectionContext} from '../../contexts/ConnectionContext'

export default function ConnectStatus() {
    const {theme} = useContext(ThemeContext)

    const {connection, dispatchConnection} = useContext(ConnectionContext)
    const {connected, teamInfo} = connection

    const logo = teamInfo.logo

    return <div className='connect-status'>
        {/* state */}
        <div className='connect-status-info connect-status-state'
            style={{background: theme.tone.widget}}
        >
            <span style={{color: connected ? theme.tone.text : 'red'}}>
                {connected ? 'Connected To ' : 'Disconnected'}
            </span>
            <span style={{color: teamInfo.color}}>
                {connected ? teamInfo.number : ''}
            </span>
        </div>
        {/* team name */}
        <div className='connect-status-info connect-status-team-name'
            style={{background: theme.tone.widget, color: teamInfo.color}}
        >
            {connected ? teamInfo.name : 'No Team Set'}
        </div>
        {/* logo and disconnect */}
        <div className='connect-status-left-items'>
            <button className='connect-status-disconnect' style={{
                background: theme.tone.widget,
                color: connected ? 'red' : theme.keyColorSet.high
            }}
                onClick={() => {
                    if(connected) dispatchConnection({type: 'DISCONNECT'})
                }}>
                {connected ? 'Disconnect' : 'Connect'}
            </button>
            <div className='connect-status-logo'>   
                {logo}
            </div>
        </div>
    </div>
}