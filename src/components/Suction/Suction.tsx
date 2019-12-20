import React, {useState, useEffect} from 'react';
import './Suction.css'
import SuctionGraphic from './SuctionGraphic';
import NetworkTables from '../../network/networktables';

export default function Suction() {
    let [active, setActive] = useState(false)

    useEffect(() => {
        NetworkTables.addKeyListener('/SmartDashboard/suction', newActive => {
            if(newActive !== active) setActive(newActive)
        })
    }, [])

    useEffect(() => {
        NetworkTables.putValue('/SmartDashboard/suction', active)
    }, [active])

    return (
        <div id = 'suction'>
            <SuctionGraphic
                active={active}
                onClick = {() => setActive(!active)}
            />
        </div>
    )
}