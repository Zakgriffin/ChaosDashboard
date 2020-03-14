import React from 'react'
import './App.css'
import ThemeContextProvider from '../../contexts/ThemeContext'
import ConnectionContextProvider from '../../contexts/ConnectionContext'

import {Widget, WidgetContainer} from '../WidgetComponents'
import Empty from '../Empty'

import ConnectionMaker from '../ConnectionMaker/ConnectionMaker'
import ConnectStatus from '../ConnectStatus/ConnectStatus'
import RobotGraphic from '../RobotGraphic/RobotGraphic'
import TimeMeter from '../TimeMeter/TimeMeter'
import ControlPanel from '../ControlPanel/ControlPanel'
import Test from '../Test'

export default function App() {
    return <div className='App'>
        <ThemeContextProvider>
        <ConnectionContextProvider>
            <WidgetContainer>
                <Widget x={6} y={2} width={6} height={6}>
                    <RobotGraphic/>
                </Widget>

                <Widget name='Match Time' x={14} y={0} width={2} height={4}>
                    <TimeMeter variables = {{time: 'timer'}}/>
                </Widget>

                <Widget name='Camera' x={0} y={2} width={4} height={3}>
                    <Empty/>
                </Widget>

                <Widget name='Camera' x={0} y={5} width={4} height={3}>
                    <Empty/>
                </Widget>

                <Widget name='Drive Controls' x={4} y={2} width={2} height={6}>
                    <Empty/>
                </Widget>

                <Widget name='Motor Stuff' x={6} y={0} width={4} height={2}>
                    <Empty/>
                </Widget>

                <Widget name='Controller Type' x={4} y={0} width={2} height={2}>
                    <Empty/>
                </Widget>

                <Widget name='Test' x={10} y={0} width={2} height={2}>
                    <Test/>
                </Widget>

                <Widget name='RGB Pallet' x={12} y={0} width={2} height={2}>
                    <Empty/>
                </Widget>

                <Widget name='Control Panel' x={12} y={2} width={2} height={2}>
                    <ControlPanel/>
                </Widget>

                <Widget name='Autonomous' x={12} y={4} width={4} height={3}>
                    <Empty />
                </Widget>

                <Widget name='Dashboard Settings' x={12} y={7} width={4} height={1}>
                    <Empty/>
                </Widget>

                <Widget x={0} y={0} width={4} height={2} backColor={false}>
                    <ConnectStatus/>
                </Widget>
            </WidgetContainer>
            <ConnectionMaker/>
        </ConnectionContextProvider>
        </ThemeContextProvider>
    </div>
}