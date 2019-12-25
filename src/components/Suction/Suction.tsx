import React from 'react';
import './Suction.css'
import SuctionGraphic from './SuctionGraphic';
import useNetworkTable from '../../network/useNetworkTable';

interface IProps {
    variables: {
        active: string
    }

    x?: number
    y?: number
    width?: number
    height?: number
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