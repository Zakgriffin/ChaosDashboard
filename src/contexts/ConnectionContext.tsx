import React, {createContext, useReducer} from 'react'
import fs from 'fs'

interface IState {
    connected: boolean
    address: string
    teamInfo: {
        teamNumber: number
        teamColor: string
    }
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
        case 'CONNECTED':
            return {...state, connected: true}
        case 'DISCONNECTED':
            return {...state,
                connected: false,
                address: ''
            }
        case 'CONNECTED_TO':
            if(!action.payload) return state
            return {...state,
                connected: true,
                address: action.payload
            }
        case 'SET_TEAM_NUMBER':
            if(typeof action.payload !== 'number') return state
            let teamNumber = action.payload
            let teamInfoRaw = fs.readFileSync(`./src/teamInfo/${teamNumber}/teamInfo.json`)
            let teamInfo = JSON.parse(teamInfoRaw.toString())
            console.log(teamInfo)
            return {... state, teamInfo}
        default:
            return state
    }
}

const initialState = {
    connected: false,
    address: 'NONE',
    teamInfo: {
        teamNumber: -1,
        teamColor: ''
    }
}

export default function ConnectionContextProvider(props: {children: any}) {
    const [connection, dispatchConnection] = useReducer(reducer, initialState)

    return <ConnectionContext.Provider value={{connection, dispatchConnection}}>
        {props.children}
    </ConnectionContext.Provider>
}