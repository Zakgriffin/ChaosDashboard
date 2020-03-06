import React, {useEffect} from 'react'
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
    const width = 30
    const height = 40

    return <svg viewBox={`0 0 ${width} ${height}`} height='100%'>
        <g style={move(width / 2, height)}>
            <Chassis x={0} y={-3.5}/>
            <MountingColumn x={-4.125} y={-2}/>
            {/*<Lift x={20} y={35}/>*/}
            {/*<Intake x={15} y={75}/>*/}
        </g>
    </svg>
}

function move(x: number, y: number) {
    return {transform: `translate(${x}px, ${y}px)`,}
}

function Chassis({x, y}: {x: number, y: number}) {
    const [rightWheelAngle, setRightWheelAngle] = useNetworkTable('rightWheelAngle', 0)
    const [driveFast, setDriveFast] = useNetworkTable('driveFast', false)

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
    const [shooterActive, setShooterActive] = useNetworkTable('shooterActive', false)
    const [lowerMagAngle, setLowerMagAngle] = useNetworkTable('lowerMagAngle', 0)
    const [upperMagAngle, setUpperMagAngle] = useNetworkTable('upperMagAngle', 0)
    const [winchAngle, setWinchAngle] = useNetworkTable('winchAngle', 0)

    useEffect(() => {
        setTimeout(() => setWinchAngle(winchAngle + 1), 10)
    }, [winchAngle])

    const columnWidth = 2
    const columnHeight = 35

    return <g style={move(x, y)}>
        <rect className='column' x={-columnWidth / 2} y={-columnHeight} width={columnWidth} height={columnHeight} fill='#bbb'/>
        <PlasticShield x={-7.5} y={-6}/>
        <Shooter x={0} y={-31.5} pivot={16} active={shooterActive}/>
        <MagStage x={0} y={-9} angle={upperMagAngle}/>
        <MagStage x={0} y={-23} angle={lowerMagAngle}/>
        <Winch x={0} y={-36.25} angle={winchAngle}/>
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
    const [hookLiftHeight, setHookLiftHeight] = useNetworkTable('hookLiftHeight', 10)
    
    useEffect(() => {
        setTimeout(() => setHookLiftHeight(hookLiftHeight + 0.04), 10)
    }, [hookLiftHeight])

    return <g style={move(x, y)}>
        <rect width={2} height={40} fill='#bbb'/>
        <rect x={2} y={-hookLiftHeight} width={2} height={40} fill='#bbb'/>
        <rect x={4} y={-hookLiftHeight * 2} width={2} height={40} fill='#bbb'/>
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

function Winch({x, y, angle}: {x: number, y: number, angle: number}) {
    return <g style={move(x, y)}>
        <rect x={-1.25} y={-1.25} width={2.5} height={2.5} rx={0.8} fill='#666'/>
        <rect x={-0.4} y={-0.4} width={0.8} height={0.8} fill='#444' style={{
            transform: `rotate(${angle}deg)`,
        }}/>
    </g>
}

function Shooter({x, y, pivot, active}: {x: number, y: number, pivot: number, active: boolean}) {
    const [lineUpWithLimelight] = useNetworkTable('lineUpWithLimelight', false)

    return <g style={{
        transform: `translate(${x}px, ${y}px) rotate(${-pivot}deg)`,
    }}>
        <g style={move(0, 2)}>
            <rect className='beam' x={-0.5} y={-5.5} width={1} height={5} fill='gray'/>
            <rect className='beam' x={-4} y={-0.5} width={8} height={1} fill='gray'/>
            <g className='wheels' fill='#800' stroke={active ? 'red' : 'none'} strokeWidth={0.3}>
                <rect x={3} y={-1.5} width={4} height={1} rx={0.2}/>
                <rect x={3} y={0.5} width={4} height={1} rx={0.2}/>
            </g>
            <rect className='beam' x={4} y={-5} width={2} height={9.5} fill='gray'/>

            {lineUpWithLimelight ? <LightBeams x={5} y={0}/> : undefined}
        </g>
        <circle r={0.3} fill='yellow'/>
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

function MagStage({x, y, angle}: {x: number, y: number, angle: number}) {
    const hubRadius = 1.5
    const spoolRadius = 2.25
    const spoolSpacing = 7
    const s = spoolSpacing / 2

    return <g fill='#444' style={move(x, y)}>
        <g style={{
            transform: `translate(0%, ${s}px) rotate(${angle}deg)`,
            transition: '0.1s'
        }}>
            <circle className='spool' r={spoolRadius} fill='#eee'/>
            <circle className='hub' r={hubRadius} />
            <rect x={-0.5} y={-0.5} width={1} height={1} fill='gray'/>
        </g>
        <g style={{
            transform: `translate(0%, ${-s}px) rotate(${angle}deg)`,
            transition: '0.1s'
        }}>
            <circle className='spool' r={spoolRadius} fill='#eee'/>
            <circle className='hub' r={hubRadius} />
            <rect x={-0.5} y={-0.5} width={1} height={1} fill='gray'/>
        </g>
        <line x1={hubRadius} y1={s} x2={hubRadius} y2={-s} stroke='#444' strokeWidth={0.3}/>
        <line x1={-hubRadius} y1={s} x2={-hubRadius} y2={-s} stroke='#444' strokeWidth={0.3}/>
    </g>
}