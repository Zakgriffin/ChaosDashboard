import React, {createContext, useReducer} from 'react'
import {ITeamInfo, getTeamInfo} from '../teamInfo/TeamInfo'
import NetworkTables from '../network/NetworkTables'
getTeamInfo(2)
interface IState {
    connected: boolean
    address: string
    connecting: boolean
    teamInfo: ITeamInfo
}

interface IAction {
    type: string
    payload?: any
}

interface IContext {
    connection: IState
    dispatchConnection: (action: IAction) => void
}

export const ConnectionContext = createContext({} as IContext)

const reducer = (state: IState, action: IAction): IState => {
    switch(action.type) {
        case 'CONNECTION_SUCCESS':
            if(!action.payload) return state
            let {teamNumber, address} = action.payload
            return {
                connected: true,
                connecting: false,
                address: address,
                teamInfo: getTeamInfo(teamNumber)
            }
        case 'CONNECTION_FAIL':
            return {
                connected: false,
                connecting: false,
                address: '',
                teamInfo: getTeamInfo(-1)
            }
        case 'DISCONNECT':
            NetworkTables.disconnect()
            return {
                connected: false,
                connecting: state.connecting,
                address: '',
                teamInfo: getTeamInfo(-1)
            }
        case 'TRY_CONNECTION':
            return {
                connected: false,
                connecting: true,
                address: '',
                teamInfo: getTeamInfo(-1)
            }
        default:
            return state
    }
}

const initialState = {
    connected: true,
    address: 'NONE',
    connecting: false,
    teamInfo: getTeamInfo(-1)
}

export default function ConnectionContextProvider(props: {children: any}) {
    const [connection, dispatchConnection] = useReducer(reducer, initialState)

    return <ConnectionContext.Provider value={{connection, dispatchConnection}}>
        {props.children}
    </ConnectionContext.Provider>
}