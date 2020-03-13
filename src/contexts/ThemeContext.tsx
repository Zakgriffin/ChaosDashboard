import React, {createContext, useReducer} from 'react'

interface IState {
    background: string
    widget: string
    text: string
}

interface IAction {
    type: string
    themeName?: string
}

interface IContext {
    theme: IState
    dispatchTheme: (action: IAction) => void
}

const themes: {[key: string]: IState} = {
    dark: {
        background: '#222',
        widget: '#2e2e2e',
        text: '#fff'
    },
    light: {
        background: 'eee',
        widget: 'ddd',
        text: '#222'
    }
}

export const ThemeContext = createContext({} as IContext)

const reducer = (state: IState, action: IAction): IState => {
    switch(action.type) {
        case 'SET_THEME':
            if(!action.themeName) return state
            return themes[action.themeName]
        default:
            return state
    }
}

const initialState = themes.dark

export default function ThemeContextProvider(props: {children: any}) {
    const [theme, dispatchTheme] = useReducer(reducer, initialState)

    return <ThemeContext.Provider value={{theme, dispatchTheme}}>
        {props.children}
    </ThemeContext.Provider>
}