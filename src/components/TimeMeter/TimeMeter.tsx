import React, {useState, useEffect} from 'react'
import './TimeMeter.css'

interface IProps {
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
    key: string
    time: number
    color: string
}

export default function TimeMeter(props: IProps) {
    let [stages, setStages] = useState<IStage[]>(),
        [totalTime, setTotalTime] = useState(),
        [currentTime, setCurrentTime] = useState(0)

    useEffect(() => {
        let total = 0
        let newStages = Object.entries(props.stages).map(([key, [time, color]]) => {
            total += time
            return {key, time: total, color}
        })
        setStages(newStages.reverse())
        setTotalTime(total)
    }, [props.stages])

    useEffect(() => {
        setTimeout(() => {
            setCurrentTime(currentTime + 0.01)
        }, 10)
    }, [currentTime])
    
    if(!stages) return <div/>

    let width = 12
    let corner = 6
    
    let scaleTime = (time: number) => (time / totalTime) * 100

    let stageGraphics = stages.map((stage) => {
        return <rect key={stage.key}
            height={scaleTime(stage.time)}
            width={width}
            fill={stage.color}
        />
    })
    let breakLines = stages.map((stage) => {
        if(stage.time === totalTime) return null
        let y = scaleTime(stage.time)

        return <line key={stage.key}
            y1={y}
            x2={width}
            y2={y}
        />
    })

    let currentStage = stages
        .slice()
        .reverse()
        .find(stage => currentTime < stage.time)

    let date = new Date(0)
    date.setSeconds(currentTime)
    let timeString = date.toISOString().substr(14, 5);

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
            <g strokeWidth='0.3' textAnchor='end'>
                <text x='-5' y={scaleTime(currentTime)}
                    stroke='white'
                    fontSize='6'
                >
                    {currentStage?.key}
                </text>
                <text x='-5' y={scaleTime(currentTime) + 5.5}
                    stroke={currentStage?.color}
                    fontSize='4'
                >
                    {timeString}
                </text>
            </g>
        </svg>
    )
}