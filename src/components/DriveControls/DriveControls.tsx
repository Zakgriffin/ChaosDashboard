import React, {useState, useContext} from 'react'
import {ThemeContext} from '../../contexts/ThemeContext'
import {map} from '../../functions'
import useNetworkTable from '../../network/useNetworkTable'

export default function DriveControls() {
    const {theme} = useContext(ThemeContext)

    const [power, setPower] = useNetworkTable('power', 0.5)
    const [fastScale, setFastScale] = useNetworkTable('fastScale', 1.5)
    const [lerp, setLerp] = useNetworkTable('lerp', 0.2)
    const [curve, setCurve] = useNetworkTable('curve', 0.6)
    const [deadzone, setDeadzone] = useNetworkTable('deadzone', 0.2)

    const [driveGoal] = useNetworkTable('driveGoal', 0)
    const [driveSpeed] = useNetworkTable('driveSpeed', 0)
    const [driveThrottle] = useNetworkTable('driveThrottle', 0)

    const gap = (i: number) => 150 + 35 * i

    return <svg viewBox='-50 0 100 400' style={{userSelect: 'none'}}>
        <Graph y={65} curve={curve} deadzone={deadzone} fastScale={fastScale} power={power}
            driveGoal={driveGoal} driveSpeed={driveSpeed} driveThrottle={driveThrottle}
        />

        <line x1={-40} y1={122} x2={40} y2={122}
            stroke={theme.common.strokeColor}
            strokeWidth={theme.common.strokeWeight * 0.75}
            strokeLinecap='round'
        />

        <Slider name='Power'      y={gap(0)} color='#3b5' value={power} set={setPower} min={0} max={1}/>
        <Slider name='Fast Scale' y={gap(1)} color='rgb(221, 52, 136)' value={fastScale} set={setFastScale} min={1} max={2}/>
        <Slider name='Lerp'       y={gap(2)} color='#90f' value={lerp} set={setLerp} min={0} max={1}/>
        <Slider name='Curve'      y={gap(3)} color='rgb(42, 152, 226)' value={curve} set={setCurve} min={0} max={1}/>
        <Slider name='Deadzone'   y={gap(4)} color='rgb(246, 108, 33)' value={deadzone} set={setDeadzone} min={0} max={0.5}/>
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

    return <g style={{transform: `translateY(${y}px)`}}>
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
    power: number
    driveGoal: number
    driveSpeed: number
    driveThrottle: number
}

function Graph({y, curve, deadzone, fastScale, power, driveGoal, driveSpeed, driveThrottle}: IGraphProps) {
    const size = 45
    const graphMap = (x: number) => map(x, -1, 1, -size, size)
    const deadzoneMapped = graphMap(deadzone)
    const funcToGraphPoints = (func: (x: number) => number) => {
        let points = ''

        let n = 30
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
            {/* axes */}
            <line x1={-size} x2={size} stroke='gray' strokeDasharray={3.1}/>
            <line y1={-size} y2={size} stroke='gray'strokeDasharray={3.1}/>

            {/* current drive levels */}
            <circle cx={graphMap(driveThrottle)} cy={graphMap(driveGoal)} r={3}
                fill='#3b58' strokeWidth={2}/>
            <line cx={graphMap(driveThrottle)} cy={graphMap(driveSpeed)} r={3}
                fill='#90f8' strokeWidth={2}/>

            {/* drive graphs */}
            <polyline points={fastGraphPoints} fill='none' stroke='rgb(221, 52, 136, 0.4)' strokeWidth={1.5}/>
            <polyline points={graphPoints} fill='none' stroke='rgb(51, 152, 214)' strokeWidth={2}/>

            {/* deadzone */}
            <g stroke='rgb(246, 108, 33)' strokeWidth={1.5}>
                <line x1={deadzoneMapped} y1={-5} x2={deadzoneMapped} y2={5}/>
                <line x1={-deadzoneMapped} y1={-5} x2={-deadzoneMapped} y2={5}/>
                <line x1={-deadzoneMapped} x2={deadzoneMapped}/>
            </g>
        </g>

        {/* max labels */}
        <text x={2} y={size + 2} fill='#3b5' fontSize={7} textAnchor='start'>-{power.toFixed(2)}</text>
        <text x={-2} y={-size + 2} fill='#3b5' fontSize={7} textAnchor='end'>{power.toFixed(2)}</text>
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
    return fast * driveFunc(x, d, c)
}