import React, {useContext, useState, useEffect, useRef} from 'react'
import {ThemeContext} from '../../contexts/ThemeContext'
import {WidgetContext} from '../../contexts/WidgetContext'

export default function LEDPallet() {
    const {theme} = useContext(ThemeContext)
    const {LEDpalletColor, setColor} = useContext(WidgetContext)

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

        <circle cy={15} r={10} fill={`rgb(${red}, ${green}, ${blue})`}/>
    </svg>
}

function ColorBar({x, color, value}: {x: number, color: string, value: [number, (newVal: number) => void]}) {
    const [magnitude, setMagnitude] = value
    const maxMag = 255
    const maxHeight = 40
    const scrollScale = 0.15

    let height = magnitude * (maxHeight / maxMag)
    console.log(magnitude)

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