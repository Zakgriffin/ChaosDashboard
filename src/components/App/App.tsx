import React from 'react'
import './App.css'
import TimeMeter from '../TimeMeter/TimeMeter'
import Suction from '../Suction/Suction'
import Gyro from '../Gyro/Gyro'
import Simulation from '../Simulation/Simulation'
import Connection from '../Connection/Connection'

import WidgetContainer from '../WidgetContainer'
import ControlPanel from '../ControlPanel'
import RobotGraphic from '../RobotGraphic/RobotGraphic'
import GridLayout from 'react-grid-layout'
import Empty from '../Empty'

export default function App() {
    return <div className = 'App'>
        {/* <GridLayout className="layout" cols={16} rowHeight={window.innerWidth / 16} width={window.innerWidth} verticalCompact={false} margin={[5, 5]}>
            <div key='s' style={{
                background: '#2e2e2e',
            }} data-grid={{x: 0, y: 7, w: 1, h: 1}}>
            </div>
            <div key='a' style={{
                background: '#2e2e2e',
            }} data-grid={{x: 2, y: 0, w: 15, h: 3}}>
            </div>
        </GridLayout> */}
        <WidgetContainer>
            <RobotGraphic x={6} y={2} width={6} height={6}/>
            <TimeMeter
                variables = {{
                    time: 'timer'
                }}
                stages={{
                    Auto: [15, '#26b145'],
                    Teleop: [135, '#fece35'],
                    Endgame: [30, '#c91828']
                }}
                x={14} y={0} width={2} height={4}
            />

            <Empty x={0} y={2} width={4} height={3} temp='Camera'/>
            <Empty x={0} y={5} width={4} height={3} temp='Camera'/>
            <Empty x={4} y={2} width={2} height={6} temp='Drive Controls'/>
            <Empty x={6} y={0} width={4} height={2} temp='Motor Stuff'/>
            <Empty x={4} y={0} width={2} height={2} temp='Controller Type'/>
            <Empty x={10} y={0} width={2} height={2} temp='Empty'/>
            <Empty x={12} y={0} width={2} height={2} temp='RGB Pallet'/>
            <Empty x={12} y={2} width={2} height={2} temp='Color Panel'/>
            <Empty x={12} y={4} width={4} height={3} temp='Autonomous'/>
            <Empty x={12} y={7} width={4} height={1} temp='Dashboard Settings'/>

            {/* <Simulation
                //x={1} y={14} width={16} height={8} fixed
                x={-3} y={0} width={3} height={3} fixed
            /> */}
        </WidgetContainer>
        {/*<Connection/>*/}
    </div>
}