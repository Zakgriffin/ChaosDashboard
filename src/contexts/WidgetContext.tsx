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

    allianceColor: string
    setAlliance: (team: string) => void
    toggleAlliance: () => void
}

export const WidgetContext = createContext({} as IContext)

const teamColors = {
    red: '#900',
    blue: '#00a'
}

export default function WidgetContextProvider(props: {children: any}) {
    const [LEDpalletColor, setLEDpalletColor] = useState({
        red: 80,
        green: 140,
        blue: 200
    })
    const setColor = (color: string) => {
        return (value: number) => setLEDpalletColor({...LEDpalletColor, [color]: value})
    }

    const [allianceColor, setAllianceColor] = useState(teamColors.red)
    const setAlliance = (team: string) => {
        // ugly, fix later
        if(team === 'red') {
            setAllianceColor(teamColors.red)
        } else if(team === 'blue') {
            setAllianceColor(teamColors.blue)
        }
    }
    const toggleAlliance = () => {
        setAllianceColor(allianceColor === teamColors.red ? teamColors.blue : teamColors.red)
    }

    return <WidgetContext.Provider value={{
        LEDpalletColor,
        setLEDpalletColor,
        setColor,
        allianceColor,
        setAlliance,
        toggleAlliance
    }}>
        {props.children}
    </WidgetContext.Provider>
}