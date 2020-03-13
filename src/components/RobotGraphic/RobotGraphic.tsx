import React, {useState} from 'react'
import useNetworkTable from '../../network/useNetworkTable'
import {describeArc} from '../../functions'

interface IProps {
    x?: number
    y?: number
    width?: number
    height?: number
}

interface IPos {
    x: number
    y: number
}

export default function RobotGraphic(props: IProps) {
    const width = 40
    const height = 40

    return <svg viewBox={`0 0 ${width} ${height}`} height='100%'>
        <g style={move(width / 2, height)}>
            <ElectronicsPanel x={3.125} y={-5}/>
            <Lift x={-10.125} y={-5}/> {/*7.125*/}
            <MountingColumn x={-4.125} y={-2}/>
            <Chassis x={0} y={-3.5}/>
            {/*<Intake x={15} y={75}/>*/}
            <Bumper x={0} y={-3.5}/>
        </g>
    </svg>
}

function move(x: number, y: number) {
    return {transform: `translate(${x}px, ${y}px)`,}
}

function Bumper({x, y}: {x: number, y: number}) {
    const [bumperType, setBumperType] = useState(0)
    
    const colors = ['#900', '#00a', '#0006', '#0000']
    function inc() {
        setBumperType(bumperType < colors.length - 1 ? bumperType + 1 : 0)
    }
    let color = colors[bumperType]

    return <g style={move(x, y)}>
        <rect x={-15} y={-2.25} width={30} height={4.5} rx={1} fill={color} onClick={inc}/>
        {color !== '#0000' ? 
            <text y={1.4} fontSize={4} fill='white'  pointerEvents='none' textAnchor='middle'>2458</text> : undefined
        }
    </g>
}

function ElectronicsPanel({x, y}: {x: number, y: number}) {
    return <g style={move(x, y)}>
        <rect x={0} y={-12} width={1} height={12} fill='#999'/>
        <rect x={-6.25} y={-12} width={6.25} height={1} fill='#999'/>
    </g>
}

function Chassis({x, y}: {x: number, y: number}) {
    const [rightWheelAngle] = useNetworkTable('rightWheelAngle', 0)
    const [driveFast] = useNetworkTable('driveFast', false)

    return <g style={move(x, y)}>
        <Wheel x={-8.75} y={0.5} angle={rightWheelAngle} fast={driveFast}/>
        <Wheel x={0} y={0.5} angle={rightWheelAngle} fast={driveFast}/>
        <Wheel x={8.75} y={0.5} angle={rightWheelAngle} fast={driveFast}/>
        <Base x={0} y={0}/>
    </g>
}

function Intake({x, y}: {x: number, y: number}) {
    return <g style={move(x, y)}>
        <circle className='intake' r={3} fill='lime'/>
    </g>
}

function Base({x, y}: {x: number, y: number}) {
    const baseWidth = 28.25
    const baseHeight = 3

    return <g style={move(x, y)}>
        <rect x={-baseWidth / 2} y={-baseHeight / 2} width={baseWidth} height={baseHeight} fill='gray'/>
    </g>
}

function MountingColumn({x, y}: {x: number, y: number}) {
    const [lowerMagRots] = useNetworkTable('lowerMagRots', 0)
    const [upperMagRots] = useNetworkTable('upperMagRots', 0)
    const [winchRots] = useNetworkTable('winchRots', 0)

    const columnWidth = 2
    const columnHeight = 35

    return <g style={move(x, y)}>
        <rect className='column' x={-columnWidth / 2} y={-columnHeight} width={columnWidth} height={columnHeight} fill='#bbb'/>
        <PlasticShield x={-7.5} y={-6}/>
        <Shooter x={0} y={-31.5} pivot={16}/>
        <MagStage x={0} y={-9} rotations={upperMagRots}/>
        <MagStage x={0} y={-23} rotations={lowerMagRots}/>
        <Winch x={0} y={-36.25} rotations={winchRots}/>
    </g>
}

function PlasticShield({x, y}: {x: number, y: number}) {
    const plasticHeight = 22

    return <g style={move(x, y)}>
        <rect x={-0.25} y={-plasticHeight} width={0.5} height={plasticHeight} fill='#eeea'/>
        <path d={describeArc(0, 0, 6.5, -90, 0, false)} stroke='#eeea'
            strokeWidth={0.5} fill='none' style={move(6.5, -plasticHeight)}/>
    </g>
}

function Lift({x, y}: {x: number, y: number}) {
    const [hookLiftHeight] = useNetworkTable('hookLiftHeight', 2)
    const lift = hookLiftHeight + 0.1
    const liftHeight = 26

    return <g style={move(x, y - liftHeight)}>
        <rect width={1} height={liftHeight} fill='#999'/>
        <rect x={1} y={-lift} width={1} height={liftHeight} fill='#999'/>
        <rect x={2} y={-lift * 2} width={1} height={liftHeight} fill='#999'/>
        
    </g>
}

function Wheel({x, y, angle, fast}: {x: number, y: number, angle: number, fast: boolean}) {
    angle *= -360

    return <g stroke='none' style={{
        transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`,
        transition: '0.1s'
    }}>
        <circle r={3} fill='white' stroke='lime' strokeWidth={fast ? 0.4 : 0}/>

        <rect x={-3.25} y={-0.75} width={6.5} height={1.5} fill='white'/>
        <rect x={-3.25} y={-0.75} width={6.5} height={1.5} fill='white' style={{
            transform: `rotate(60deg)`
        }}/>
        <rect x={-3.25} y={-0.75} width={6.5} height={1.5} fill='white' style={{
            transform: `rotate(120deg)`
        }}/>

        <rect x={-2} y={-0.375} width={4} height={0.75} fill='black'/>
        <rect x={-2} y={-0.375} width={4} height={0.75} fill='black' style={{
            transform: `rotate(60deg)`
        }}/>
        <rect x={-2} y={-0.375} width={4} height={0.75} fill='black' style={{
            transform: `rotate(120deg)`
        }}/>
    </g>
}

function Winch({x, y, rotations}: {x: number, y: number, rotations: number}) {
    const angle = rotations * 360

    return <g style={move(x, y)}>
        <rect x={-1.25} y={-1.25} width={2.5} height={2.5} rx={0.8} fill='#666'/>
        <rect x={-0.4} y={-0.4} width={0.8} height={0.8} fill='#444' style={{
            transform: `rotate(${angle}deg)`,
        }}/>
    </g>
}

function Shooter({x, y, pivot}: {x: number, y: number, pivot: number}) {
    const [lineUpWithLimelight] = useNetworkTable('lineUpWithLimelight', false)
    const [shooterVelocity] = useNetworkTable('shooterVelocity', 0)
    const [shooterActive] = useNetworkTable('shooterActive', false)

    const percent = Math.min(100, Math.abs(shooterVelocity / 14 / 5))
    let meterColor = '#00b'//'#209'
    let radius = 4.2
    if(percent > 50) {
        meterColor = 'green'
        radius = 4.4
    }
    if(percent > 80) {
        meterColor = '#fb0'
        radius = 4.6
    }
    if(percent === 100) {
        meterColor = '#b00'
        radius = 5
    }

    return <g style={move(x, y)}>
        <g style={{transform: `rotate(${-pivot}deg)`}}>
            <circle r={1.5} fill='#111'/>
            <g style={move(0, 2)}>
                <rect className='beam' x={-0.5} y={-5.5} width={1} height={5} fill='gray'/>
                <rect className='beam' x={-4} y={-0.5} width={8} height={1} fill='gray'/>
                <g className='wheels' fill='#800' stroke={percent > 0 ? meterColor : 'none'} strokeWidth={0.2} style={{transition:'stroke 0.3s'}}>
                    <rect x={3} y={-1.5} width={4} height={1} rx={0.4}/>
                    <rect x={3} y={0.5} width={4} height={1} rx={0.4}/>
                </g>
                <rect className='beam' x={4} y={-5} width={2} height={9.5} fill='gray'/>

                {lineUpWithLimelight ? <LightBeams x={5} y={0}/> : undefined}
            </g>
        </g>
        <g visibility={percent > 0 ? 'visible' : 'hidden'}>
            <line x1={7.7} y1={1} x2={18} y2={-0.5} stroke={meterColor} strokeWidth={0.4} strokeLinecap='round' style={{transition:'stroke 0.3s'}}/>
            <circle cx={18} cy={-0.5} r={radius} fill='#111'/>
            <path d={describeArc(18, -0.5, radius, 0, percent * 3.59999, true)}
                fill={meterColor} style={{transition:'fill 0.3s'}}/>
            <text x={18} y={0.2} fontSize={2.5} fontWeight={30} textAnchor='middle' fill='white'>
                {Math.floor(percent)}%
            </text>
        </g>
    </g>
}
function LightBeams({x, y}: {x: number, y: number}) {
    return <g style={move(x, y)} stroke='lime' strokeLinecap='round' strokeWidth={0.6}>
        <line x1={4} y1={0} x2={7} y2={0}/>
        <line x1={4} y1={0} x2={7} y2={0} style={{
            transform: 'rotate(30deg)'
        }}/>
        <line x1={4} y1={0} x2={7} y2={0} style={{
            transform: 'rotate(-30deg)'
        }}/>
    </g>   
}

function MagStage({x, y, rotations}: {x: number, y: number, rotations: number}) {
    const angle = rotations * 360
    const hubRadius = 1.5
    const spoolRadius = 2.25
    const spoolSpacing = 7
    const s = spoolSpacing / 2

    return <g fill='#444' style={move(x, y)}>
        {/*
        <line x1={-spoolRadius} y1={s} x2={-spoolRadius} y2={-s} stroke='#a00' strokeWidth={0.3}/>
        <line x1={spoolRadius} y1={s} x2={spoolRadius} y2={-s} stroke='#111' strokeWidth={0.3}/>
        */}
        <g style={{
            transform: `translate(0%, ${s}px) rotate(${angle}deg)`,
            transition: '0.1s'
        }}>
            <circle className='spool' r={spoolRadius} fill='#eee'/>
            <circle className='hub' r={hubRadius} />
            <rect x={-0.4} y={-0.4} width={0.8} height={0.8} fill='gray'/>
        </g>
        <g style={{
            transform: `translate(0%, ${-s}px) rotate(${angle}deg)`,
            transition: '0.1s'
        }}>
            <circle className='spool' r={spoolRadius} fill='#eee'/>
            <circle className='hub' r={hubRadius} />
            <rect x={-0.4} y={-0.4} width={0.8} height={0.8} fill='gray'/>
        </g>
        <line x1={hubRadius} y1={s} x2={hubRadius} y2={-s} stroke='#444' strokeWidth={0.3}/>
        <line x1={-hubRadius} y1={s} x2={-hubRadius} y2={-s} stroke='#444' strokeWidth={0.3}/>
    </g>
}