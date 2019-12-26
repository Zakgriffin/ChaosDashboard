import React from 'react';
import './Suction.css'
import useNetworkTable from '../../network/useNetworkTable';

interface IProps {
    variables: {
        active: string
    }

    x?: number
    y?: number
    width?: number
    height?: number
}

export default function Suction(props: IProps) {
    let [active, setActive] = useNetworkTable(props.variables.active, false)

    return (
        <div className='suction widget'>
            <svg className='suction-graphic widget-graphic' viewBox='-50 -50 100 100'>
                <g className='suction-graphic-hover'
                    stroke='white'
                    strokeWidth='1.5'
                    strokeLinejoin='round'
                    onClick={() => setActive(!active)}
                >
                    <rect x='-15' y='-10' width='60' height='20' rx='10' ry='10'/>
                    <rect x='5' y='-6' width='25' height='12' rx='6' ry='6'/>
                    <circle className='suction-indicator'
                        x='5'
                        r='6'
                        fill={active ? '#26b145' : '#c91828'}
                        style={{transform: `translate(${active ? 10 : 0}px)`}}
                    />
                    <line x1='-30' x2='-30' y1='10' y2='-10'/>
                    <line x1='-35' x2='-35' y1='15' y2='-15'/>
                </g>
            </svg>
        </div>
    )
}