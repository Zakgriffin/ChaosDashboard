import React, {createContext, useReducer} from 'react'

interface IState {
    background: string
    widget: string
    text: string
    trafficColors: {
        red: string
        yellow: string
        green: string
    }
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
        text: '#fff',
        trafficColors: {
            red: '#c91828',
            yellow: '#fece35',
            green: '#26b145'
        }
    },
    light: {
        background: '#ddd',
        widget: '#ccc',
        text: '#222',
        trafficColors: {
            red: '#c91828',
            yellow: '#fece35',
            green: '#26b145'
        }
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