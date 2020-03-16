import React, {createContext, useState} from 'react'

export interface IColor {
    red: number
    blue: number
    green: number
}

interface IContext {
    LEDpalletColor: IColor
    setLEDpalletColor: (color: IColor) => void
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

    return <WidgetContext.Provider value={{LEDpalletColor, setLEDpalletColor, setColor}}>
        {props.children}
    </WidgetContext.Provider>
}