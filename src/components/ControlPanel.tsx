import React, {useState, useEffect} from 'react'

interface IProps {
    x?: number
    y?: number
    width?: number
    height?: number
}

const colors = [
    '#D92727',
    '#FFE433',
    '#1477D2',
    '#6FCC43'
]

export default function ControlPanel(props: IProps) {
    const [angle, setAngle] = useState(0)

    let count = 8
    let anglePer = 360 / count
    let currentColor = colors[colors.length - 1 - mod((Math.floor(angle / anglePer)), colors.length)]

    useEffect(() => {
        setTimeout(() => setAngle(angle - 1), 10)
    }, [angle])

    let arcs = []
    let outlines = []
    let lastAngle = 0
    let r = 35
    for(let i = 0; i < count; i++) {
        let newAngle = 360 / count * (i + 1)
        arcs.push(<path
            d={describeArc(0, 0, r, lastAngle, newAngle, true)}
            fill={colors[i % colors.length]}
        />)
        outlines.push(<path
            d={describeArc(0, 0, r, lastAngle, newAngle, true)}
            fill='none'
            stroke='white'
            strokeWidth='2'
        />)
        lastAngle = newAngle
    }
    

    return <svg viewBox='-50 -50 100 100'>
        <defs>
            <marker id='head' orient='auto'
                markerWidth='2' markerHeight='4'
                refX='0.1' refY='2'>
                <path d='M0,0 V4 L2,2 Z' fill='white'/>
            </marker>
        </defs>
        {/*
        <circle
            r='40'
            fill={colors[0]}
            stroke='white'
            strokeWidth='2'
        />
        */}
        <g style={{transform: `rotate(${angle}deg)`}}>
            {arcs}
            {outlines}
        </g>
        <polygon
            points='3.5,45.5 -3.5,45.5 0,40'
            fill={currentColor}
            stroke='white'
            strokeWidth='1.5'
        />
        <path d={describeArc(0, 0, 42, -25 - angle / 20, 25 + angle / 20, false)}
            stroke='white'
            strokeWidth='2'
            fill='none'
            marker-end='url(#head)'
        />
    </svg>
}


//https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number, pie: boolean){
    function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
        var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0
      
        return {
          x: centerX + (radius * Math.cos(angleInRadians)),
          y: centerY + (radius * Math.sin(angleInRadians))
        }
    }

    var start = polarToCartesian(x, y, radius, endAngle)
    var end = polarToCartesian(x, y, radius, startAngle)

    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

    var d = pie ? [
        'M', 0, 0,
        'L', start.x, start.y, 
        'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ') : [
        'M', start.x, start.y,
        'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ')

    return d       
}

function mod(n1: number, n2: number) {
    return ((n1%n2)+n2)%n2
}