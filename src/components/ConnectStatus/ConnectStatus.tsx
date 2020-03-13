import React, { useContext } from 'react';
import './ConnectStatus.css'
import {ThemeContext} from '../../contexts/ThemeContext'
import {ConnectionContext} from '../../contexts/ConnectionContext'
import Logo from '../../teamInfo/2458/Logo';

export default function ConnectStatus() {
    const {theme} = useContext(ThemeContext)
    const {widget, text} = theme
    const {connection, dispatchConnection} = useContext(ConnectionContext)
    const {connected, address, teamInfo} = connection
    const {teamNumber, teamColor} = teamInfo

    return <div className='connect-status'>
        <div className='connect-status-info connect-status-state'
            style={{background: widget}}
        >
            <span style={{color: connected ? text : 'red'}}>
                {connected ? 'Connected To ' : 'Disconnected'}
            </span>
            <span style={{color: teamColor}}>
                {connected ? teamNumber : ''}
            </span>
        </div>
        <div className='connect-status-info connect-status-team-name'
            style={{background: widget}}
        >

        </div>
        <div className='connect-status-left-items'>
            <button className='connect-status-disconnect'
                onClick={() => {
                    dispatchConnection({type: 'CONNECTED'})
                    dispatchConnection({type: 'SET_TEAM_NUMBER', payload: 2458})}
                }>
                Disconnect
            </button>

            <Logo className='connect-status-logo'/>
        </div>
    </div>
}