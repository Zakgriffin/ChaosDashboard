import React, {useEffect} from 'react'
import useNetworkTable from '../../network/useNetworkTable'

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
    return <svg viewBox='0 0 100 100'>
        <Chassis x={15} y={75}/>
        <MountingColumn x={30} y={20}/>
        <Lift x={20} y={35}/>
        <Intake x={15} y={75}/>
    </svg>
}

function move(x: number, y: number) {
    return {transform: `translate(${x}%, ${y}%)`,}
}

function Chassis({x, y}: {x: number, y: number}) {
    const [rightWheelAngle, setRightWheelAngle] = useNetworkTable('rightWheelAngle', 0)
    const [driveFast, setDriveFast] = useNetworkTable('driveFast', false)

    useEffect(() => {
        setTimeout(() => setRightWheelAngle(rightWheelAngle + 3), 10)
    }, [rightWheelAngle])

    return <g style={move(x, y)}>
        <Wheel x={8} y={15} angle={rightWheelAngle} fast={driveFast}/>
        <Wheel x={35} y={15} angle={rightWheelAngle} fast={driveFast}/>
        <Wheel x={62} y={15} angle={rightWheelAngle} fast={driveFast}/>
        <Base x={-5} y={0}/>
    </g>
}

function Intake({x, y}: {x: number, y: number}) {
    return <g style={move(x, y)}>
        <circle className='intake' r={3} fill='lime'/>
    </g>
}

function Base({x, y}: {x: number, y: number}) {
    return <g style={move(x, y)}>
        <rect width={80} height={15} fill='gray'/>
    </g>
}

function MountingColumn({x, y}: {x: number, y: number}) {
    const [shooterActive, setShooterActive] = useNetworkTable('shooterActive', false)
    const [lowerMagAngle, setLowerMagAngle] = useNetworkTable('lowerMagAngle', 0)
    const [upperMagAngle, setUpperMagAngle] = useNetworkTable('upperMagAngle', 0)
    const [winchAngle, setWinchAngle] = useNetworkTable('winchAngle', 0)

    useEffect(() => {
        setTimeout(() => setShooterActive(!shooterActive), 1000)
    }, [shooterActive])
    useEffect(() => {
        setTimeout(() => setLowerMagAngle(lowerMagAngle + 10), 10)
    }, [lowerMagAngle])
    useEffect(() => {
        setTimeout(() => setUpperMagAngle(upperMagAngle + 2), 10)
    }, [upperMagAngle])
    useEffect(() => {
        setTimeout(() => setWinchAngle(winchAngle + 1), 10)
    }, [winchAngle])
    
    return <g style={move(x, y)}>
        <rect className='column' width={6} height={60} fill='#bbb'/>
        <Shooter x={3} y={4} pivot={16} active={shooterActive}/>
        <MagStage x={3} y={20} angle={upperMagAngle}/>
        <MagStage x={3} y={50} angle={lowerMagAngle}/>
        <Winch x={3} y={-3} angle={winchAngle}/>
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
    return <g style={{
            transform: `translate(${x}%, ${y}%) rotate(${angle}deg)`,
        }}>
        <circle r={8} fill='white' stroke='blue'/>

        <rect x={-9} y={-2} width={18} height={4} fill='white'/>
        <rect x={-9} y={-2} width={18} height={4} fill='white' style={{
            transform: `rotate(60deg)`
        }}/>
        <rect x={-9} y={-2} width={18} height={4} fill='white' style={{
            transform: `rotate(120deg)`
        }}/>

        <rect x={-6} y={-1} width={12} height={2} fill='black'/>
        <rect x={-6} y={-1} width={12} height={2} fill='black' style={{
            transform: `rotate(60deg)`
        }}/>
        <rect x={-6} y={-1} width={12} height={2} fill='black' style={{
            transform: `rotate(120deg)`
        }}/>
    </g>
}

function Winch({x, y, angle}: {x: number, y: number, angle: number}) {
    return <g style={move(x, y)}>
        <rect x={-3} y={-3} width={6} height={6} rx={2} fill='#666'/>
        <rect x={-1} y={-1} width={2} height={2} fill='#444' style={{
            transform: `rotate(${angle}deg)`,
        }}/>
    </g>
}

function Shooter({x, y, pivot, active}: {x: number, y: number, pivot: number, active: boolean}) {
    const [lineUpWithLimelight] = useNetworkTable('lineUpWithLimelight', true)
    return <g style={{
            transform: `translate(${x}%, ${y}%) rotate(${-pivot}deg)`,
        }}>
        <g className='wheels' fill='#800' stroke={active ? 'red' : 'none'}>
            <rect x={11} y={-7} width={10} height={3.5} rx={2}/>
            <rect x={11} y={4} width={10} height={3.5} rx={2}/>
        </g>

        <rect className='beam' x={0} y={-2} width={15} height={4} fill='#bbb'/>
        <rect className='beam' x={14} y={-10} width={4} height={20} fill='#bbb'/>

        {lineUpWithLimelight ? <LightBeams/> : undefined}
    </g>
}
function LightBeams() {
    return <g style={{
        transform: `translate(20%, 0%)`,
    }}>
        <line x1={5} y1={0} x2={12} y2={0} stroke='lime' strokeLinecap='round' style={{
            transform: 'rotate(0deg)'
        }}/>
        <line x1={5} y1={0} x2={12} y2={0} stroke='lime' strokeLinecap='round' style={{
            transform: 'rotate(32deg)'
        }}/>
        <line x1={5} y1={0} x2={12} y2={0} stroke='lime' strokeLinecap='round' style={{
            transform: 'rotate(-32deg)'
        }}/>
    </g>   
}

function MagStage({x, y, angle}: {x: number, y: number, angle: number}) {
    return <g fill='#444' style={move(x, y)}>
        <line x1={4} y1={7} x2={4} y2={-7} stroke='#444' strokeWidth={0.6}/>
        <line x1={-4} y1={7} x2={-4} y2={-7} stroke='#444' strokeWidth={0.6}/>
        <g style={{
            transform: `translate(0%, 7%) rotate(${angle}deg)`
        }}>
            <circle className='spool' r={4} />
            <rect x={-1} y={-1} width={2} height={2} fill='gray'/>
        </g>
        <g style={{
            transform: `translate(0%, -7%) rotate(${angle}deg)`
        }}>
            <circle className='spool' r={4} />
            <rect x={-1} y={-1} width={2} height={2} fill='gray'/>
        </g>
    </g>
}