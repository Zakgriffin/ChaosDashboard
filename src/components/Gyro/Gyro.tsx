import * as React from 'react';
import './Gyro.css'
import GyroGraphic from './GyroGraphic';
import NetworkTables from '../../network/networktables';

interface IProps {}
interface IState {
    angle: number
}

export default class Gyro extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        
        this.state = {
            angle: 0
        }
    }

    componentDidMount() {
        NetworkTables.addKeyListener('/SmartDashboard/gyro', angle => {
            this.setState({angle})
        })
    }

    componentDidUpdate() {
        let dial = document.getElementById('dial')
        dial.style.transform = `rotate(${this.state.angle}deg)`
    }

    render() {
        return (
            <div id = 'Gyro'>
                <GyroGraphic id = 'gyro-graphic'/>
                <h1 id = 'gyro-label'>{Math.round(this.state.angle)}</h1>
            </div>
        )
    }
}