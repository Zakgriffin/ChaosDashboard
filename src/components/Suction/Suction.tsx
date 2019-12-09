import * as React from 'react'
import './Suction.css'
import SuctionGraphic from './SuctionGraphic';

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
    componentDidUpdate = () => {
        let indicator = document.getElementById('suction-indicator')
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
        console.log('test')
    }

    render() {
        return (
            <div id = 'suction'>
                <SuctionGraphic click = {this.handleClick}/>
            </div>
        )
    }
}