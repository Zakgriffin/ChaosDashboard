import React from 'react'
import useNetworkTable from '../../network/useNetworkTable'

interface IProps {
    variables: {
        angle: string
    }
}

export default function Gyro(props: IProps) {
    let [angle] = useNetworkTable(props.variables.angle, 0)
    
    return <div className='gyro widget'>
        <svg className='gyro-graphic widget-graphic' viewBox='-50 -57 100 100'>
            <g stroke='white' strokeWidth='1.5' strokeLinejoin='round'>
                <rect rx='10' ry='10' x='-15' y='-54' width='30' height='30'/>
                <circle r='40'/>
                <line x2='40'/>
                <line x2='-40'/>
                <line y2='40'/>
                <line y2='-40'/>
                <circle r='32'/>
                <polygon className='gyro-dial'
                    points='5,0 -5,0 0,-25'
                    style={{transform: `rotate(${angle}deg)`}}
                />
                <circle r='5'/>
            </g>
            <text y='-44'
                fill='white'
                textAnchor='middle'
                fontSize='8'
            >
                {Math.round(angle)}
            </text>
        </svg>
    </div>
}