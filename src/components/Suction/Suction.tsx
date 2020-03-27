import React from 'react';
import './Suction.css'
import useNetworkTable from '../../network/useNetworkTable';
import {describeArc} from '../../functions'

interface IProps {
    variables: {
        active: string
    }
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
                    <rect x='-20' y='-10' width='60' height='20' rx='10' ry='10'/>
                    <rect x='0' y='-6' width='25' height='12' rx='6' ry='6'/>
                    <circle className='suction-indicator'
                        cx='6'
                        r='6'
                        fill={active ? '#26b145' : '#c91828'}
                        style={{transform: `translate(${active ? 13 : 0}px)`}}
                    />
                    <path
                        d={describeArc(-30, 0, 20, 0, 180, true)}
                    />
                    
                    <g className='suction-lines' strokeLinecap='round' stroke={active ? 'white' : 'transparent'}>
                        <path d={`M ${-36}, ${10 * active} L ${-36}, ${-10 * active}`}/>
                        <path d={`M ${-42}, ${15 * active} L ${-42}, ${-15 * active}`}/>
                    </g>
                </g>
            </svg>
        </div>
    )
}