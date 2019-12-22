import React from 'react'

export default function SuctionGraphic(props: any) {
    let {active, onClick} = props
    return (
        <svg viewBox='0.0 0.0 960.0 960.0' >
            <g id = 'suction-graphic' onClick={onClick} fill='#000000' stroke='#ffffff' strokeWidth='12'>
                <path d='m371 571l0 -182c0 0 0 0 0 0c0 0 0 0 0 -0l390 0c50 0 91 40 91 91l0 0l0 0c0 50 -40 91 -91 91l-390 0l0 0c0 0 0 0 0 0z'/>
                <path d='m239 298l0 0c65 0 125 34 158 90c32 56 33 125 0 182c-32 56 -92 91 -157 91z'/>
                <path d='m725 480l0 0l0 0c0 16 -6 31 -17 43c-11 11 -26 17 -43 17l-124 0c-33 0 -60 -27 -60 -60l0 0l0 0c0 -33 27 -60 60 -60l124 0l0 0c33 0 60 27 60 60z'/>
                
                <path id='suction-indicator'
                    d='m602 479l0 0c0 -34 27 -61 61 -61l0 0c16 0 32 6 43 18c11 11 18 27 18 43l0 0c0 34 -27 61 -61 61.7265l0 0c-34.090576 0 -61.7265 -27.635925 -61.7265 -61.7265z'
                    fill={active ? '#26b145' : '#c91828'}
                    style={{transform: `translate(${active ? 0 : -124}px)`}}
                />
                
                <path d='m122.88488 344.23483l0 274.95395'/>
                <path d='m181.10971 397.3158l0 168.80945'/>
            </g>
        </svg>
    )
}