import React, {createContext, useState} from 'react'

interface IContext {
    LEDpalletColor: {
        red: number
        green: number
        blue: number
    }
    setColor: (color: string) => (value: number) => void
}

export const WidgetContext = createContext({} as IContext)


export default function WidgetContextProvider(props: {children: any}) {
    const [LEDpalletColor, setLEDpalletColor] = useState({
        red: 80,
        green: 140,
        blue: 200
    })
    const setColor = (color: string) => {
        return (value: number) => setLEDpalletColor({...LEDpalletColor, [color]: value})
    }

    return <WidgetContext.Provider value={{LEDpalletColor, setColor}}>
        {props.children}
    </WidgetContext.Provider>
}