import * as React from 'react'
import './Suction.css'
import SuctionGraphic from './SuctionGraphic';
import NetworkTables from '../../network/networktables';

interface IProps {}
interface IState {
    active: boolean
}

export default class Suction extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        
        this.state = {
            active: true
        }
    }

    componentDidMount = () => {
        NetworkTables.addKeyListener('/SmartDashboard/suction', active => {
            if(active != this.state.active) this.setState({active})
        })
    }

    componentDidUpdate = () => {
        let indicator = document.getElementById('suction-indicator')
        NetworkTables.putValue('/SmartDashboard/suction', this.state.active)
        if(!indicator) return
        if(this.state.active) {
            indicator.style.transform = `translate(0px)`
            indicator.style.fill = '#26b145'
        } else {
            indicator.style.transform = `translate(-124px)`
            indicator.style.fill = '#c91828'
        }
    }

    handleClick = () => {
        this.setState({active: !this.state.active})
    }

    render() {
        return (
            <div id = 'suction'>
                <SuctionGraphic click = {this.handleClick}/>
            </div>
        )
    }
}