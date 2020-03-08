import React from 'react'
import './App.css'
import TimeMeter from '../TimeMeter/TimeMeter'
import Suction from '../Suction/Suction'
import Gyro from '../Gyro/Gyro'
import Simulation from '../Simulation/Simulation'
import Connection from '../Connection/Connection'

import Draggable from '../Draggable'
import ControlPanel from '../ControlPanel'
import RobotGraphic from '../RobotGraphic/RobotGraphic'

export default function App() {
    return <div className = 'App'>
        <Draggable>
            <RobotGraphic x={35} y={1} width={20} height={20}/>
            {/*
            <Simulation
                //x={1} y={14} width={16} height={8} fixed
                x={1} y={1} width={40} height={20} fixed
            />
            */}
            <TimeMeter
                variables = {{
                    time: 'timer'
                }}
                stages={{
                    Auto: [15, '#26b145'],
                    Teleop: [135, '#fece35'],
                    Endgame: [30, '#c91828']
                }}
                x={55.6} y={1} width={7} height={20}
            />
        </Draggable>
        <Connection/>
    </div>
}