import React, {createContext, useReducer} from 'react'

interface IState {
    tone: ITone
    keyColorSet: IKeyColorSet
    common: ICommon
}

interface ITone {
    background: string
    widget: string
    text: string
}

interface IKeyColorSet {
    low: string
    medium: string
    high: string
}

interface ICommon {
    strokeWeight: number
    strokeColor: string
}

interface IAction {
    type: string
    payload?: any
}

interface IContext {
    theme: IState
    dispatchTheme: (action: IAction) => void
}

const tones: {[key: string]: ITone} = {
    dark: {
        background: '#222',
        widget: '#2e2e2e',
        text: '#fff',
    },
    light: {
        background: '#ddd',
        widget: '#ccc',
        text: '#222',
    }
}

const keyColorSets: {[key: string]: IKeyColorSet} = {
    ryg: {
        low: '#c91828',
        medium: '#fece35',
        high: '#26b145'
    }
}

const commons: {[key: string]: ICommon} = {
    generic: {
        strokeWeight: 2,
        strokeColor: 'white'
    }
}

export const ThemeContext = createContext({} as IContext)

const reducer = (state: IState, action: IAction): IState => {
    switch(action.type) {
        case 'SET_THEME':
            if(!action.payload) return state
            const {toneKey, keyColorSetKey, commonKey} = action.payload
            let tone = tones[toneKey] || state.tone
            let keyColorSet = keyColorSets[keyColorSetKey] || state.keyColorSet
            let common = commons[commonKey] || state.common
            return {tone, keyColorSet, common}
        default:
            return state
    }
}

const initialState: IState = {
    tone: tones.dark,
    keyColorSet: keyColorSets.ryg,
    common: commons.generic
}

export default function ThemeContextProvider(props: {children: any}) {
    const [theme, dispatchTheme] = useReducer(reducer, initialState)

    return <ThemeContext.Provider value={{theme, dispatchTheme}}>
        {props.children}
    </ThemeContext.Provider>
}