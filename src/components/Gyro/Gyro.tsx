import React from 'react';
import './Gyro.css'
import GyroGraphic from './GyroGraphic';
import useNetworkTable from '../../network/useNetworkTable'

interface IProps {
    variables: {
        angle: string
    }
    
    x?: number
    y?: number
    width?: number
    height?: number
}

export default function Gyro(props: IProps) {
    let [angle] = useNetworkTable(props.variables.angle, 45)
    
    return (
        <div className='gyro widget'>
            <GyroGraphic
                angle = {angle}
            />
        </div>
    )
}