import React from 'react'

export default function SuctionGraphic(props: any) {
    let {active, onClick} = props
    return (
        <svg viewBox='0.0 0.0 960.0 960.0' >
            <g id = 'suction-graphic' onClick={onClick} fill='#000000' stroke='#ffffff' strokeWidth='12'>
                <path d='m371.6633 571.4342l0 -182.88559c0 -4.272461E-4 1.5258789E-4 -7.9345703E-4 4.5776367E-4 -0.0010986328c2.746582E-4 -2.746582E-4 6.713867E-4 -4.272461E-4 0.0010681152 -4.272461E-4l390.4811 0.0015258789c50.50244 0 91.44275 40.940308 91.44275 91.44278l0 0l0 0c0 50.50244 -40.940308 91.44281 -91.44275 91.44281l-390.48264 0l0 0c-8.239746E-4 0 -0.0015258789 -7.324219E-4 -0.0015258789 -0.0015258789z'/>
                <path d='m239.01016 298.26505l0 0c65.0636 -0.40856934 125.38162 33.99652 158.14966 90.20767c32.768005 56.21115 32.986023 125.651245 0.57159424 182.06708c-32.41443 56.41577 -92.51523 91.19891 -157.58011 91.19891z'/>
                <path d='m725.7095 479.99152l0 0l0 0c0 16.177307 -6.4263916 31.692047 -17.865479 43.131104c-11.439087 11.439087 -26.953796 17.86554 -43.131104 17.86554l-124.599915 0c-33.6875 0 -60.996613 -27.309143 -60.996613 -60.996643l0 0l0 0c0 -33.6875 27.309113 -60.996613 60.996613 -60.996613l124.599915 0l0 0c33.6875 0 60.996582 27.309113 60.996582 60.996613z'/>
                
                <path id='suction-indicator'
                    d='m602.61194 479.99115l0 0c0 -34.090607 27.635925 -61.7265 61.7265 -61.7265l0 0c16.37091 0 32.07129 6.503296 43.647217 18.079254c11.575989 11.575989 18.079285 27.276337 18.079285 43.647247l0 0c0 34.090576 -27.635925 61.7265 -61.7265 61.7265l0 0c-34.090576 0 -61.7265 -27.635925 -61.7265 -61.7265z'
                    fill={active ? '#26b145' : '#c91828'}
                    style={{transform: `translate(${active ? 0 : -124}px)`}}
                />
                
                <path d='m122.88488 344.23483l0 274.95395'/>
                <path d='m181.10971 397.3158l0 168.80945'/>
            </g>
        </svg>
    )
}