import React from 'react'
import './App.css'
import ThemeContextProvider from '../../contexts/ThemeContext'
import ConnectionContextProvider from '../../contexts/ConnectionContext'
import WidgetContextProvider from '../../contexts/WidgetContext'

import {Widget, WidgetContainer} from '../WidgetComponents'
import Empty from '../Empty'

import ConnectionMaker from '../ConnectionMaker/ConnectionMaker'
import ConnectStatus from '../ConnectStatus/ConnectStatus'
import Camera from '../Camera/Camera'
import RobotGraphic from '../RobotGraphic/RobotGraphic'
import TimeMeter from '../TimeMeter/TimeMeter'
import ControlPanel from '../ControlPanel/ControlPanel'
import Autonomous from '../Autonomous/Autonomous'
import DriveControls from '../DriveControls/DriveControls'
import LEDPallet from '../LEDPallet/LEDPallet'
import ControllerType from '../ControllerType/ControllerType'

export default function App() {
    return <div className='App'>
        <ThemeContextProvider>
        <ConnectionContextProvider>
        <WidgetContextProvider>
            <WidgetContainer>
                <Widget x={6} y={2} width={6} height={6}>
                    <RobotGraphic/>
                </Widget>

                <Widget name='Match Time' x={14} y={0} width={2} height={4}>
                    <TimeMeter variables = {{time: 'timer'}}/>
                </Widget>

                <Widget name='Camera' x={0} y={2} width={4} height={3}>
                    <Camera camNumber={1}/>
                </Widget>

                <Widget name='Camera' x={0} y={5} width={4} height={3}>
                    <Camera camNumber={2}/>
                </Widget>

                <Widget name='Drive Controls' x={4} y={2} width={2} height={6}>
                    <DriveControls/>
                </Widget>

                <Widget name='Motor Stuff' x={6} y={0} width={4} height={2}>
                    <Empty/>
                </Widget>

                <Widget name='Controller Type' x={4} y={0} width={2} height={2}>
                    <ControllerType/>
                </Widget>

                <Widget x={10} y={0} width={2} height={2}>
                    <Empty/>
                </Widget>

                <Widget name='LED Pallet' x={12} y={0} width={2} height={2}>
                    <LEDPallet/>
                </Widget>

                <Widget name='Control Panel' x={12} y={2} width={2} height={2}>
                    <ControlPanel/>
                </Widget>

                <Widget name='Autonomous' x={12} y={4} width={4} height={3}>
                    <Autonomous/>
                </Widget>

                <Widget name='Dashboard Settings' x={12} y={7} width={4} height={1}>
                    <Empty/>
                </Widget>

                <Widget x={0} y={0} width={4} height={2} backColor={false}>
                    <ConnectStatus/>
                </Widget>
            </WidgetContainer>
            <ConnectionMaker/>
        </WidgetContextProvider>
        </ConnectionContextProvider>
        </ThemeContextProvider>
    </div>
}