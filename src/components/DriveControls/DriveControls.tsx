import React, {useState, useContext} from 'react'
import {ThemeContext} from '../../contexts/ThemeContext'
import {map} from '../../functions'

export default function DriveControls() {
    const {theme} = useContext(ThemeContext)

    const [power, setPower] = useState(0.5)
    const [fastScale, setFastScale] = useState(1.5)
    const [lerp, setLerp] = useState(0.2)
    const [curve, setCurve] = useState(.6)
    const [deadzone, setDeadzone] = useState(.1)

    const gap = (i: number) => 150 + 35 * i

    return <svg viewBox='-50 0 100 400'>
        <Graph y={65} curve={curve} deadzone={deadzone} fastScale={fastScale}/>

        <line x1={-40} y1={122} x2={40} y2={122}
            stroke={theme.common.strokeColor}
            strokeWidth={theme.common.strokeWeight * 0.75}
            strokeLinecap='round'
        />

        <Slider name='Power'      y={gap(0)} color='#3b5' value={power} set={setPower} min={0} max={1}/>
        <Slider name='Fast Scale' y={gap(1)} color='#999' value={fastScale} set={setFastScale} min={1} max={2}/>
        <Slider name='Lerp'       y={gap(2)} color='#90f' value={lerp} set={setLerp} min={0} max={1}/>
        <Slider name='Curve'      y={gap(3)} color='#15c' value={curve} set={setCurve} min={0} max={1}/>
        <Slider name='Deadzone'   y={gap(4)} color='#b61' value={deadzone} set={setDeadzone} min={0} max={0.5}/>
    </svg>
}

interface ISlider {
    name: string
    y: number
    color: string
    value: number
    set: any
    min: number
    max: number
}

function Slider({name, y, color, value, set, min, max}: ISlider) {
    const {theme} = useContext(ThemeContext)

    const width = 35
    const scrollScale = 0.0005

    const handleWheel = (e: React.WheelEvent) => {
        let newVal = value - e.deltaY * scrollScale
        if(newVal < min) newVal = min
        if(newVal > max) newVal = max
        set(newVal)
    }

    return <g style={{transform: `translateY(${y}px)`, userSelect: 'none'}}>
        <line x1={-width} x2={width}
            stroke={color} strokeWidth={theme.common.strokeWeight} strokeLinecap='round'
        />
        <circle cx={map(value, min, max, -width, width)} r={4.5} fill={color}/>

        <text y={-8} fill={theme.tone.text} fontSize={8} textAnchor='middle'>{name}</text>
        <text x={-width - 8} y={3} fill={theme.tone.text} fontSize={10} textAnchor='middle'>{min}</text>
        <text x={width + 8} y={3} fill={theme.tone.text} fontSize={10} textAnchor='middle'>{max}</text>
        <text y={15} fill={color} fontSize={8} textAnchor='middle'>{value.toFixed(2)}</text>
        <rect x={-width} y={-5} width={width * 2} height={10} fill='#0000'
            onWheel={handleWheel}
        />
    </g>
}

interface IGraphProps {
    y: number
    curve: number
    deadzone: number
    fastScale: number
}

function Graph({y, curve, deadzone, fastScale}: IGraphProps) {
    const size = 45
    const graphMap = (x: number) => map(x, -1, 1, -size, size)
    const deadzoneMapped = graphMap(deadzone)
    const funcToGraphPoints = (func: (x: number) => number) => {
        let points = ''

        let n = 20
        for(let i = 0; i < n; i++) {
            let x = map(i, 0, n - 1, -1, 1)
            let y = func(x)
            points += `${graphMap(x)}, ${-graphMap(y)} `
        }
        return points
    }

    let graphPoints = funcToGraphPoints(x => driveFunc(x, deadzone, curve))
    let fastGraphPoints = funcToGraphPoints(x => fastDriveFunc(x, deadzone, curve, fastScale))

    return <g style={{transform: `translateY(${y}px)`}}>
        <mask id='graphMask'>
            <rect x={-size} y={-size} width={size * 2} height={size * 2} fill='white'/>
        </mask>
        <g mask='url(#graphMask)'>
            <line x1={-size} x2={size} stroke='gray' strokeDasharray={3.1}/>
            <line y1={-size} y2={size} stroke='gray'strokeDasharray={3.1}/>

            <polyline points={fastGraphPoints} fill='none' stroke='#777' strokeWidth={1.5}/>
            <polyline points={graphPoints} fill='none' stroke='#15c' strokeWidth={2}/>

            <g stroke='#b61' strokeWidth={1.5}>
                <line x1={deadzoneMapped} y1={-5} x2={deadzoneMapped} y2={5}/>
                <line x1={-deadzoneMapped} y1={-5} x2={-deadzoneMapped} y2={5}/>
                <line x1={-deadzoneMapped} x2={deadzoneMapped}/>
            </g>
        </g>
    </g>
}

function curveFunc(x: number, c: number) {
    return c * Math.pow(x, 3) + (1 - c) * x
}

function driveFunc(x: number, d: number, c: number) {
    if(x > d) return curveFunc((x - 1) / (1 - d) + 1, c)
    else if(x < -d) return curveFunc((x + 1) / (1 - d) - 1, c)
    return 0
}

function fastDriveFunc(x: number, d: number, c: number, fast: number) {
    return driveFunc(x * fast, d, c)
}