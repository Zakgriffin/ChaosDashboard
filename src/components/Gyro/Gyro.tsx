import React, {useState, useEffect} from 'react';
import './Gyro.css'
import GyroGraphic from './GyroGraphic';
import NetworkTables from '../../network/networktables';

export default function Gyro() {
    let [angle, setAngle] = useState(45)

    useEffect(() => {
        NetworkTables.addKeyListener('/SmartDashboard/gyro', newAngle => {
            setAngle(newAngle)
        })
    }, [])
    
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