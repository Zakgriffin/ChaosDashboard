import * as React from 'react';
import './Gyro.css'
import GyroGraphic from './GyroGraphic';

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
        setInterval(() => {
            this.setState({angle: (this.state.angle + 1) % 360})
        }, 10)
    }

    componentDidUpdate() {
        let dial = document.getElementById('dial')
        dial.style.transform = `rotate(${this.state.angle}deg)`
    }

    render() {
        return (
            <div id = 'Gyro'>
                <GyroGraphic id = 'gyro-graphic'/>
                <h1 id = 'gyro-label'>{this.state.angle}</h1>
            </div>
        )
    }
}