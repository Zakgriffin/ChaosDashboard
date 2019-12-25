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
            let newStage = {key, time: total, color}
            total += time
            return newStage
        })
        setStages(newStages)
        setTotalTime(total)
    }, [])
    
    if(!stages) return <div/>

    let width = 12
    let corner = 6
    
    let scaleTime = (time: number) => (time / totalTime) * 100

    let stageGraphics = stages.map((stage) => {
        return <rect key={stage.key}
            y={scaleTime(stage.time)}
            width={width}
            height='100'
            fill={stage.color}
        />
    })
    let breakLines = stages.map((stage) => {
        if(stage.time == 0) return
        let y = scaleTime(stage.time)

        return <line key={stage.key}
            y1={y}
            x2={width}
            y2={y}
        />
    })

    let label = ''
    for(let {key, time} of stages) {
        if(currentTime > time) label = key
    }

    return (
        <svg viewBox={`${width / 2 - 50} 0 100 100`} className='time-meter-graphic'>
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
            <text x='-5' y={scaleTime(currentTime)}
                stroke='white'
                strokeWidth='0.3'
                textAnchor='end'
                fontSize='6'
            >
                {label}
            </text>
        </svg>
    )
}