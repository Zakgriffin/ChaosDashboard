import React, {useState, useContext} from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'
import { WidgetContext } from '../../contexts/WidgetContext'
import { capFirstLetter } from '../../functions'

export default function Autonomous(props: any) {
    const {theme} = useContext(ThemeContext)

    const [startingPos, setStartingPos] = useState('center')
    const [toControlPanel, setToControlPanel] = useState(false)
    const [collectTrenchBalls, setCollectTrenchBalls] = useState(true)
    const [shootWithLimelight, setShootWithLimelight] = useState(true)
    
    return <svg viewBox='-100 -130 200 150'
        stroke={theme.common.strokeColor}
        strokeWidth={theme.common.strokeWeight}>
        <line x1={-80} x2={80}/>

        <RobotStartingPos x={-50} string='left' current={startingPos} set={setStartingPos} toControlPanel={toControlPanel} setToControlPanel={setToControlPanel}/>
        <RobotStartingPos x={0} string='center' current={startingPos} set={setStartingPos} toControlPanel={toControlPanel} setToControlPanel={setToControlPanel}/>
        <RobotStartingPos x={50} string='right' current={startingPos} set={setStartingPos} toControlPanel={toControlPanel} setToControlPanel={setToControlPanel}/>

        <ControlPanel x={-50} y={-90} collectTrenchBalls={collectTrenchBalls} setCollectTrenchBalls={setCollectTrenchBalls}/>
        
        <rect x={0} y={-120} width={90} height={20} fill='none' rx={2}
            stroke={theme.keyColorSet.high}
            strokeWidth={theme.common.strokeWeight * 0.75}
        />
        <text style={{userSelect: 'none'}}
            x={45} y={-106} textAnchor='middle' stroke='none' fill={theme.tone.text} fontSize={9}>
            Starting <tspan fill={theme.keyColorSet.high}>{capFirstLetter(startingPos)}</tspan>
        </text>

        <AutoOption y={-85} string='Collect Trench ' stringColored='Balls' color='#fc3' value={collectTrenchBalls} set={setCollectTrenchBalls}/>
        <AutoOption y={-72} string='Shoot With ' stringColored='Limelight' color='#3b5' value={shootWithLimelight} set={setShootWithLimelight}/>
    </svg>
}

interface IRobotStartingPosProps {
    x: number
    string: string
    current: string
    set: any
    toControlPanel: boolean
    setToControlPanel: any
}

function RobotStartingPos({x, string, current, set, toControlPanel, setToControlPanel}: IRobotStartingPosProps) {
    const {theme} = useContext(ThemeContext)
    const {allianceColor, toggleAlliance} = useContext(WidgetContext)
    
    const selected = current === string
    const xOffset = -50
    const yOffset = -24

    return <g>
        <polyline points={`${xOffset},-72 ${xOffset},${yOffset} ${x},${yOffset}`} fill='none'
            stroke={selected && toControlPanel ? theme.common.strokeColor : 'gray'}
            onClick={() => setToControlPanel(true)}
        />
        <g style={{transform: `translateX(${x}px)`}}>
            <line y2={yOffset} stroke={selected ? theme.common.strokeColor : 'gray'}
                onClick={() => set(string)}
            />
            <line y1={yOffset} y2={-50} stroke={selected && !toControlPanel ? theme.common.strokeColor : 'gray'}
                onClick={() => {
                    set(string)
                    setToControlPanel(false)
                }}
            />

            <rect x={-7} y={-7} width={14} height={14} rx={2}
                fill={selected ? allianceColor : theme.tone.widget}
                onMouseUp={e => {
                    if(e.nativeEvent.which === 1) set(string)
                    else if(e.nativeEvent.which === 3 && selected) toggleAlliance()
                }}
            />
        </g>
    </g>
}

interface IControlPanelProps {
    x: number
    y: number
    collectTrenchBalls: any
    setCollectTrenchBalls: any
}

function ControlPanel({x, y, collectTrenchBalls, setCollectTrenchBalls}: IControlPanelProps) {
    return <g style={{transform: `translate(${x}px, ${y}px)`}}>
        <polyline points='-22,-10 -22,10 22,10 22,-10' fill='none'/>
        <circle cy={-2} r={5} fill={collectTrenchBalls ? '#fc3' : '#0000'}
            onClick={() => setCollectTrenchBalls(!collectTrenchBalls)}
        />
    </g>
}

interface IAutoOptionProps {
    y: number
    string: string
    stringColored: string
    color: string
    value: boolean
    set: any
}

function AutoOption({y, string, stringColored, color, value, set}: IAutoOptionProps) {
    const {theme} = useContext(ThemeContext)

    return <g style={{transform: `translate(82px, ${y}px)`}}>
        <text style={{userSelect: 'none'}}
            x={-5} y={2} textAnchor='end' stroke='none' fill={theme.tone.text} fontSize={7}>
            {string}<tspan fill={value ? color : theme.tone.text}>{stringColored}</tspan>
        </text>
        <rect y={-4} width={8} height={8} rx={2} strokeWidth={theme.common.strokeWeight * 0.7}
            fill={value ? color : '0000'}
            onClick={() => set(!value)}        
        />
    </g>
}