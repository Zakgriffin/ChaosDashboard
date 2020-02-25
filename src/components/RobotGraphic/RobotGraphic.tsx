import React, { useState, useEffect } from 'react'

interface IProps {
    x?: number
    y?: number
    width?: number
    height?: number
}

export default function RobotGraphic(props: IProps) {
    const [angle, setAngle] = useState(-20)
    /*
    useEffect(() => {
        setTimeout(() => setAngle(angle - 1), 10)
    }, [angle])
    */
    return <svg viewBox='0 0 100 100' className='time-meter-graphic'>
        <rect className='base' x='10' y='75' width='80' height='15' fill='gray'/>

        <circle className='wheel' cx='25' cy='90' r='8' fill='white'/>
        <circle className='wheel' cx='75' cy='90' r='8' fill='white'/>

        <rect className='column' x='30' y='20' width='6' height='60' fill='#bbb'/>

        <circle className='spool' cx='33' cy='34' r='4' fill='#444'/>
        <circle className='spool' cx='33' cy='47' r='4' fill='#444'/>
        <circle className='spool' cx='33' cy='57' r='4' fill='#444'/>
        <circle className='spool' cx='33' cy='70' r='4' fill='#444'/>

        <circle className='intake' cx='15' cy='75' r='3' fill='lime'/>

        <g className='shooter' style={{
                transform: `translate(33%, 24%) rotate(${angle}deg)`,
            }}>
            <rect className='wheel' x='11' y='-7' width='10' height='3.5' rx='2' fill='#800'/>
            <rect className='wheel' x='11' y='4' width='10' height='3.5' rx='2' fill='#800'/>

            <rect className='beam' x='0' y='-2' width='15' height='4' fill='#bbb'/>
            <rect className='beam' x='14' y='-10' width='4' height='20' fill='#bbb'/>
        </g>

        <rect className='winch' x='30' y='14' width='6' height='6' rx='2' fill='#666'/>

        <rect className='winch' x='20' y='35' width='2' height='40' fill='#bbb'/>
        <rect className='winch' x='22' y='25' width='2' height='40' fill='#bbb'/>
        <rect className='winch' x='24' y='15' width='2' height='40' fill='#bbb'/>
    </svg>
}