import React, {useContext, useState} from 'react'
import {ThemeContext} from '../../contexts/ThemeContext'
import {WidgetContext, IColor} from '../../contexts/WidgetContext'

export default function LEDPallet() {
    const {theme} = useContext(ThemeContext)
    const {LEDpalletColor, setLEDpalletColor, setColor} = useContext(WidgetContext)

    const {red, green, blue} = LEDpalletColor
    
    const setRed = setColor('red')
    const setGreen = setColor('green')
    const setBlue = setColor('blue')

    return <svg viewBox='-50 -55 100 100'
        stroke={theme.common.strokeColor}
        strokeWidth={theme.common.strokeWeight}
    >
        <line x1={-45} y1={0} x2={45} y2={0}/>

        <ColorBar x={-30} color='#c91828' value={[red, setRed]}/>
        <ColorBar x={0} color='#26b145' value={[green, setGreen]}/>
        <ColorBar x={30} color='#1155cc' value={[blue, setBlue]}/>

        <SavedColor x={-30} current={LEDpalletColor} set={setLEDpalletColor}/>
        <SavedColor x={-10} current={LEDpalletColor} set={setLEDpalletColor}/>
        <SavedColor x={10} current={LEDpalletColor} set={setLEDpalletColor}/>
        <SavedColor x={30} current={LEDpalletColor} set={setLEDpalletColor}/>

        <circle cy={15} r={10} fill={colorToString(LEDpalletColor)}/>
    </svg>
}

function ColorBar({x, color, value}: {x: number, color: string, value: [number, (newVal: number) => void]}) {
    const [magnitude, setMagnitude] = value
    const maxMag = 255
    const maxHeight = 40
    const scrollScale = 0.15

    let height = magnitude * (maxHeight / maxMag)

    return <g style={{transform: `translate(${x}px, 0px)`}}>
        <rect x={-9} y={-height} width={18} height={height} fill={color}/>
        <rect x={-9} y={-maxHeight} width={18} height={maxHeight} fill='#0000' stroke='none'
            onWheel={e => {
                let newMag = magnitude - e.deltaY * scrollScale
                if(newMag < 0) newMag = 0
                if(newMag > maxMag) newMag = maxMag
                setMagnitude(newMag)
            }}
        />
    </g>
}

function SavedColor({x, current, set}: {x: number, current: IColor, set: (color: IColor) => void}) {
    const [color, setColor] = useState({red: 0, green: 0, blue: 0})


    return <g style={{transform: `translate(${x}px, 0px)`}}>
        <rect x={-7} y={30} width={14} height={8} fill={colorToString(color)}
            onMouseUp={e => {
                let which = e.nativeEvent.which
                if(which === 1) {
                    set(color)
                } else if(which === 3) {
                    setColor(current)
                }
            }}
        />
    </g>
}

function colorToString(color: IColor) {
    const {red, green, blue} = color
    return `rgb(${red}, ${green}, ${blue})`
}
