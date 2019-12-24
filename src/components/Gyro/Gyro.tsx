import React, {useState, useEffect} from 'react';
import './Gyro.css'
import GyroGraphic from './GyroGraphic';
//import NetworkTables from '../../network/networktables'
import useNetworkTable from '../../network/useNetworkTable'

export default function Gyro(props: {variables: {angle: string}}) {
    let [angle] = useNetworkTable(props.variables.angle, 45)
    
    return (
        <div id = 'gyro'
            style={{
                width: '100%',
                height: '100%'
            }}
        >
            <GyroGraphic id = 'gyro-graphic'
                angle = {angle}
            />
            <div id = 'gyro-label'>{Math.round(angle)}</div>
        </div>
    )
}