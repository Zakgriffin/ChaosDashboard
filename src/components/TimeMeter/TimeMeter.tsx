import React, {useState, useEffect} from 'react'
import './TimeMeter.css'
import useNetworkTable from '../../network/useNetworkTable'

interface IProps {
    variables: {
        time: string
    }

    meterWidth?: number
    stages: IStagesProps

    x?: number
    y?: number
    width?: number
    height?: number
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
    let [currentTime] = useNetworkTable(props.variables.time, 0)
    let [stages, setStages] = useState<IStage[]>(),
        [totalTime, setTotalTime] = useState()
    
    useEffect(() => {
        let total = 0
        let newStages = Object.entries(props.stages).map(([label, [time, color]]) => {
            total += time
            return {label, time: total, color}
        })
        setStages(newStages.reverse())
        setTotalTime(total)
    }, [props.stages])
    
    if(!stages) return <div/>

    let width = 12
    let corner = 6
    
    let scaleTime = (time: number) => (time / totalTime) * 100

    let stageGraphics = stages.map((stage) => {
        return <rect key={stage.label}
            height={scaleTime(stage.time)}
            width={width}
            fill={stage.color}
        />
    })
    let breakLines = stages.map((stage) => {
        if(stage.time === totalTime) return null
        let y = scaleTime(stage.time)

        return <line key={stage.label}
            y1={y}
            x2={width}
            y2={y}
        />
    })

    currentTime = Math.max(currentTime, 0)

    let currentStage = stages
        .slice()
        .reverse()
        .find(stage => currentTime < stage.time)

    let date = new Date(0)
    date.setSeconds(totalTime - currentTime)
    //date.setSeconds(currentStage.time - currentTime)
    let timeString = date.toISOString().substring(15, 19);

    return (
        <svg viewBox={`${width - 100} -5 110 110`} className='time-meter-graphic'>
            <mask id='levelMask'>
                <rect rx={corner} ry={corner} width={width} height='100' fill='white'/>
                <rect width='20' height={(currentTime / totalTime) * 100} fill='black'/>
            </mask>

            <g stroke='white' strokeWidth='1'>
                <rect rx={corner} ry={corner} width={width} height='100' fill='black'/>
                <g mask='url(#levelMask)'>
                    {stageGraphics}
                </g>
                {breakLines}
                <rect rx={corner} ry={corner} width={width} height='100' fill='none'/>
            </g>
            <text className='time-meter-stage-label'
                x='-5' y={scaleTime(currentTime)}
                fill='white'
                fontSize='6'
                textAnchor='end'
            >
                {currentStage && currentStage.label}
            </text>
            <text className='time-meter-time-label'
                x='-5' y={scaleTime(currentTime) + 5.5}
                fill={currentStage && currentStage.color}
                fontSize='4'
                textAnchor='end'
            >
                {timeString}
            </text>
        </svg>
    )
}