import * as React from 'react'
import './TimeMeter.css'

interface IProps {
    width?: any
    stages?: {[stage: string]: [number, string]}
}
interface IState {
    currentTime: number
    stages: {[stage: string]: [number, string]}
    totalTime: number
    size: {x: number, y: number}
    width: number
}

export default class TimeMeter extends React.Component<IProps, IState> {
    stageBars: any
    stageTimes: object

    constructor(props: IProps) {
        super(props)
        
        let stages = props.stages || {
            Auto: [15, '#26b145'],
            Teleop: [135, '#fece35'],
            Endgame: [30, '#c91828']
        }
        this.state = {
            currentTime: 0,
            width: parseInt(props.width) || 85,
            stages,
            totalTime: Object.values(stages).reduce((a, b) => a + b[0], 0),
            size: {x: 256, y: 820}
        }
        this.stageBars = {}
        this.stageTimes = {}
    }
    componentDidMount = () => {
        
        setInterval(() => {
            this.setState({currentTime:this.state.currentTime + 0.1}) //Math.random() * this.state.size) % 360
        }, 100)

        let curr = this.state.totalTime
        Object.keys(this.state.stages).map(key => {
            this.stageTimes[key] = curr
            curr -= this.state.stages[key][0]
            return undefined
        })
        
        let timeMeterGraphic = document.getElementById('time-meter-graphic')
        for(let stage of Object.keys(this.state.stages)) {
            let negPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
            negPath.setAttribute('d', this.pathString(this.stageTimes[stage], 'start'))

            timeMeterGraphic.appendChild(negPath)
        }

        for(let [stage, val] of Object.entries(this.state.stages)) {
            let color = val[1]
            let posPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
            this.stageBars[stage] = posPath
            posPath.setAttribute('fill', color)
            posPath.setAttribute('d', this.pathString(0, 'start'))

            timeMeterGraphic.appendChild(posPath)
        }

        let hand = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        this.stageBars.hand = hand
        //timeMeterGraphic.appendChild(hand)
    }
    componentDidUpdate = () => {
        //let dial = document.getElementById('dial')
        //dial.style.transform = `rotate(${this.state.angle}deg)`
        for(let [stage, time] of Object.entries(this.stageTimes)) {
            let posPath = this.stageBars[stage]
            posPath.setAttribute('d', this.pathString(time))
        }
        let hand = this.stageBars.hand
        hand.setAttribute('d', this.pathString(undefined, 'hand'))
    }

    pathString = (time, type?) => {
        let s = this.state

        let w = s.width
        let x = s.size.x/2 - w/2
        let y = s.size.y
        let stretch
        if(type === 'start') {
            stretch = -time * (s.size.y / s.totalTime)
        } else if(type === 'hand') {
            let a = 50
            return `m${x-(a-w)/2} ${(s.currentTime)* (s.size.y / s.totalTime)}l${a} 0`
        } else {
            stretch = -Math.min(s.totalTime - s.currentTime, time) * (s.size.y / s.totalTime)
        }
        return `m${x} ${y}l${w} 0l0 ${stretch}l-${w} 0z`
    }

    render() {
        let s = this.state
        return (
            <div id = 'time-meter'>
                <svg id = 'time-meter-graphic'
                    viewBox={`0.0 0.0 ${s.size.x} ${s.size.y}`}
                    xmlns='http://www.w3.org/2000/svg'>
                </svg>
            </div>
        )
    }
}