import React, { useContext } from 'react'
import './Camera.css'
import { ConnectionContext } from '../../contexts/ConnectionContext'

interface ICameraProps {
    camNumber: number
}

export default function Camera({camNumber}: ICameraProps) {
    const {connection} = useContext(ConnectionContext)
    const stream = `url('http://roborio-${connection.teamInfo.number}-frc.local:118${camNumber}/?action=stream')`
    const notFound = `url('images/nocamera.svg')`

    return <div>
        <div className='no-camera' style={{backgroundImage: notFound}}/>
        <div className='camera' style={{backgroundImage: stream}}/>
    </div>
}