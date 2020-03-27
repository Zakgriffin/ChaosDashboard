import React, {useState, useEffect, useContext} from 'react'
import useNetworkTable from '../../network/useNetworkTable'
import { ThemeContext } from '../../contexts/ThemeContext'
import { useInterval } from '../../functions'

interface IProps {
    variables: {
        time: string
    }

    meterWidth?: number
    stages?: IStagesProps
}
interface IStagesProps {
    [stage: string]: [number, string]
}
interface IStage {
    label: string
    time: number
    color: string
}

export default function TimeMeter(props: IProps) {
    const {theme} = useContext(ThemeContext)

    let [currentTime, setCurrentTime] = useState(0)//useNetworkTable(props.variables.time, 0)
    let [stages, setStages] = useState<IStage[]>(),
        [totalTime, setTotalTime] = useState(0)

    useInterval(() => {
        setCurrentTime(currentTime + 0.01)
    }, 10)
    
    useEffect(() => {
        const preStages = props.stages || {
            Auto: [15, '#26b145'],
            Teleop: [135, '#fece35'],
            Endgame: [30, '#c91828']
        }

        let total = 0
        let newStages = Object.entries(preStages).map(([label, [time, color]]) => {
            total += time
            return {label, time: total, color}
        })
        setStages(newStages.reverse())
        setTotalTime(total)
    }, [props.stages])
    
    if(!stages) return <></>

    const width = 15
    const corner = width / 2
    
    let scale = 100 * 1.7
    let scaleTime = (time: number) => (time / totalTime) * scale

    let stageGraphics = stages.map(stage => {
        return <rect key={stage.label}
            height={scaleTime(stage.time)}
            width={width}
            fill={stage.color}
        />
    })
    let breakLines = stages.map(stage => {
        if(stage.time === totalTime) return null
        let y = scaleTime(stage.time)

        return <line key={stage.label}
            y1={y}
            x2={width}
            y2={y}
        />
    })

    currentTime = Math.min(currentTime, totalTime)

    let currentStage = stages
        .slice()
        .reverse()
        .find(stage => currentTime <= stage.time)

    let date = new Date(0)
    date.setSeconds(totalTime - currentTime)
    //date.setSeconds(currentStage.time - time)
    let timeString = date.toISOString().substring(15, 19);

    let labelHeight = Math.min(currentTime, totalTime - 10)

    return <svg viewBox='0 0 100 200' className='time-meter-graphic'>
        <g style={{height:'100%', transform: 'translate(60px, 20px)'}}>
            <mask id='levelMask'>
                <rect rx={corner} width={width} height={scale} fill='white'/>
                <rect width={20} height={currentTime} fill='black'/>
            </mask>
            {/* graphic */}
            <g stroke={theme.common.strokeColor} strokeWidth={theme.common.strokeWeight}>
                <rect rx={corner} width={width} height={scale} fill='black'/>
                <g mask='url(#levelMask)'>
                    {stageGraphics}
                </g>
                {breakLines}
                <rect rx={corner} width={width} height={scale} fill='none'/>
            </g>
            {/* labels */}
            <text className='time-meter-stage-label'
                style={{userSelect: 'none'}}
                x={-5} y={labelHeight}
                fill='white'
                fontSize={10}
                textAnchor='end'
            >
                {currentStage && currentStage.label}
            </text>
            <text className='time-meter-time-label'
                style={{transition: '0.3s', userSelect: 'none'}}
                x={-5} y={labelHeight + 10}
                fill={currentStage && currentStage.color}
                fontSize={7}
                textAnchor='end'
            >
                {timeString}
            </text>
        </g>
    </svg>
}