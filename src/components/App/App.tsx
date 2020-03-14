import React from 'react'
import './App.css'
import TimeMeter from '../TimeMeter/TimeMeter'

import {Widget, WidgetContainer} from '../WidgetComponents'
import RobotGraphic from '../RobotGraphic/RobotGraphic'
import Empty from '../Empty'
import Test from '../Test'
import ThemeContextProvider, { ThemeContext } from '../../contexts/ThemeContext'
import ConnectStatus from '../ConnectStatus/ConnectStatus'
import ConnectionContextProvider from '../../contexts/ConnectionContext'
import ConnectionMaker from '../ConnectionMaker/ConnectionMaker'

export default function App() {
    return <div className='App'>
        <ThemeContextProvider>
            <WidgetContainer>
                <Widget x={6} y={2} width={6} height={6}>
                    <RobotGraphic/>
                </Widget>

                <Widget x={14} y={0} width={2} height={4}>
                    <TimeMeter
                        variables = {{
                            time: 'timer'
                        }}
                        stages={{
                            Auto: [15, '#26b145'],
                            Teleop: [135, '#fece35'],
                            Endgame: [30, '#c91828']
                        }}
                    />
                </Widget>

                <Widget x={0} y={2} width={4} height={3}>
                    <Empty temp='Camera'/>
                </Widget>

                <Widget x={0} y={5} width={4} height={3}>
                    <Empty temp='Camera'/>
                </Widget>

                <Widget x={4} y={2} width={2} height={6}>
                    <Empty temp='Drive Controls'/>
                </Widget>

                <Widget x={6} y={0} width={4} height={2}>
                    <Empty temp='Motor Stuff'/>
                </Widget>

                <Widget x={4} y={0} width={2} height={2}>
                    <Empty temp='Controller Type'/>
                </Widget>

                <Widget x={10} y={0} width={2} height={2}>
                    
                    <Test/>
                </Widget>

                <Widget x={12} y={0} width={2} height={2}>
                    <Empty temp='RGB Pallet'/>
                </Widget>

                <Widget x={12} y={2} width={2} height={2}>
                    <Empty temp='Color Panel'/>
                </Widget>

                <Widget x={12} y={4} width={4} height={3}>
                    <Empty temp='Autonomous'/>
                </Widget>

                <Widget x={12} y={7} width={4} height={1}>
                    <Empty temp='Dashboard Settings'/>
                </Widget>

                <Widget x={0} y={0} width={4} height={2} backColor={false}>
                    <ConnectionContextProvider>
                        <ConnectStatus/>
                    </ConnectionContextProvider>
                </Widget>
            </WidgetContainer>
        </ThemeContextProvider>
        
        <ConnectionContextProvider>
            <ConnectionMaker/>
        </ConnectionContextProvider>
    </div>
}