import React, {useState, useContext} from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'
import { WidgetContext } from '../../contexts/WidgetContext'

export default function Autonomous(props: any) {
    const {theme} = useContext(ThemeContext)

    const [startingPos, setStartingPos] = useState('center')
    
    return <svg viewBox='-100 -130 200 150'
        stroke={theme.common.strokeColor}
        strokeWidth={theme.common.strokeWeight}>
        <line x1={-80} x2={80}/>
        <RobotStartingPos x={-50} string='left' current={startingPos} set={setStartingPos}/>
        <RobotStartingPos x={0} string='center' current={startingPos} set={setStartingPos}/>
        <RobotStartingPos x={50} string='right' current={startingPos} set={setStartingPos}/>
    </svg>
}

interface IRobotStartingPosProps {
    x: number
    string: string
    current: string
    set: any
}

function RobotStartingPos({x, string, current, set}: IRobotStartingPosProps) {
    const {theme} = useContext(ThemeContext)
    const {allianceColor} = useContext(WidgetContext)

    return <g style={{transform: `translate(${x}px, 0px)`}}>
        <rect x={-7.5} y={-7.5} width={15} height={15} rx={2}
            fill={current === string ? allianceColor : theme.tone.widget}
            onClick={() => set(string)}
        />
    </g>
}