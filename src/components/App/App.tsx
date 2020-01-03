import React from 'react'
import './App.css'
import TimeMeter from '../TimeMeter/TimeMeter'
import Suction from '../Suction/Suction'
import Gyro from '../Gyro/Gyro'
import Simulation from '../Simulation/Simulation'
import Connection from '../Connection/Connection'

import Draggable from '../Draggable'

export default function App() {
    return <div id = 'App'>
        <Draggable>
            <Gyro
                variables = {{
                    angle: 'gyro'
                }}
                x={10} y={2} width={9} height={9}
            />
            <Suction
                variables = {{
                    active: 'suction'
                }}
                x={27} y={2} width={9} height={9}
            />
            <TimeMeter
                variables = {{
                    time: 'timer'
                }}
                stages={{
                    Auto: [15, '#26b145'],
                    Teleop: [135, '#fece35'],
                    Endgame: [30, '#c91828']
                }}
                x={54} y={4} width={9} height={15}
            />
            <Simulation
                x={1} y={14} width={16} height={8} fixed
                //x={1} y={1} width={40} height={20}
            />
        </Draggable>

        
    </div>
}