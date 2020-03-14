import React, {useState, useContext} from 'react'

import {ConnectionContext} from '../../contexts/ConnectionContext'

import NetworkTables from '../../network/NetworkTables'
// import Logo from '../../teamInfo/2458/Logo'
import './ConnectionMaker.css'
import {getTeamInfo} from '../../teamInfo/TeamInfo'

export default function ConnectionMaker() {
    const {connection, dispatchConnection} = useContext(ConnectionContext)
    const {connected, connecting} = connection

    const tryLogin = (teamNumber: number) => {
        if(connecting || typeof teamNumber !== 'number') return
        dispatchConnection({type: 'TRY_CONNECTION'})
        let address = `roborio-${teamNumber}-frc.local`
        NetworkTables.tryToConnect(address, (con) => {
            if(con) {
                dispatchConnection({type: 'CONNECTION_SUCCESS', payload: {address, teamNumber}})
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

    let teamInfo = getTeamInfo(parseInt(teamNumberField))
    let Logo = teamInfo.logo
    
    return connected ? null : <div id='blur-container'>
        <Logo/>
        <input id='team-number-input'
            type='text'
            onChange={handleChange}
            value={teamNumberField}
            onKeyDown={handleKeyDown}
            style={{
                color: teamInfo.color
            }}/>
        <button id = 'login-connect'
            style={{opacity: teamNumberField.length > 0 ? 1 : 0}}
            onClick={handleClickConnect}
        >
            {connecting ? 'Connecting' : 'Connect'}
        </button>
    </div>
}