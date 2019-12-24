import React from 'react';
import './Suction.css'
import SuctionGraphic from './SuctionGraphic';
import useNetworkTable from '../../network/useNetworkTable';

interface IProps {
    variables: {
        active: string
    }
}

export default function Suction(props: IProps) {
    let [active, setActive] = useNetworkTable(props.variables.active, false)

    return (
        <div className='suction widget'>
            <SuctionGraphic
                active={active}
                onClick={() => setActive(!active)}
            />
        </div>
    )
}