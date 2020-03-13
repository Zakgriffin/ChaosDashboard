import React, {useState, useContext} from 'react'

import {ConnectionContext} from '../../contexts/ConnectionContext'

import NetworkTables from '../../network/NetworkTables'
import Logo from '../../teamInfo/2458/Logo'
import './ConnectionMaker.css'
import {getTeamInfo} from '../../teamInfo/TeamInfo'

export default function ConnectionMaker() {
    const {connection, dispatchConnection} = useContext(ConnectionContext)
    const {connected, connecting} = connection

    const disconnect = () => {
        dispatchConnection({type: 'DISCONNECT'})
        NetworkTables.disconnect()
    }

    const tryLogin = (connectTeamNumber: number) => {
        dispatchConnection({type: 'TRY_CONNECTION'})
        NetworkTables.tryToConnect(`roborio-${connectTeamNumber}-frc.local`, (con) => {
            if(con) {
                dispatchConnection({type: 'CONNECTION_SUCCESS', payload: connectTeamNumber})
            } else {
                dispatchConnection({type: 'CONNECTION_FAIL'})
            }
        })
    }


    const [teamNumberField, setTeamNumberField] = useState('')

    const handleChange = (e: any) => {
        let val = e.target.value.trim()
        if(val.length <= 4 && !isNaN(val)) {
            setTeamNumberField(val)
        }
    }

    const handleClickConnect = () => {
        tryLogin(parseInt(teamNumberField))
    }

    const handleKeyDown = (ev: {key: string}) => {
        if(ev.key === 'Enter') {
            handleClickConnect()
        }
    }

    return <div id='blur-container'>
        <Logo id='logo'/>
        <input id='team-number-input'
            type='text'
            onChange={handleChange}
            value={teamNumberField}
            onKeyDown={handleKeyDown}
            style={{
                color: getTeamInfo(parseInt(teamNumberField)).color
            }}/>
        <button id = 'login-connect'
            style={{opacity: teamNumberField.length === 4 ? 1 : 0}}
            onClick={handleClickConnect}
        >
            {connecting ? 'Connecting' : 'Connect'}
        </button>
    </div>
}