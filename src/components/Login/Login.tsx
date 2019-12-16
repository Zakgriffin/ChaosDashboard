import * as React from 'react';
import './Login.css'
import Logo from './Logo';

interface IProps {
    tryLogin: (num: number) => void
    connecting: boolean
}
interface IState {
    teamNumber: string
}

export default class Login extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            teamNumber: ''
        }
    }

    handleChange = (e: any) => {
        let val = e.target.value.trim()
        if(val.length <= 4 && !isNaN(val)) {
            this.setState({teamNumber: val})
        }
    }

    colorCheck = () => {
        let num = this.state.teamNumber
        if(num == '2458') {
            return '#4a86e8'
        } else if(num.length == 4) {
            return '#26b145'
        }
        return 'orange'
    }

    handleClickConnect = () => {
        this.props.tryLogin(parseInt(this.state.teamNumber))
    }

    handleKeyDown = (ev: { key: string }) => {
        if(ev.key === 'Enter') {
            this.handleClickConnect()
        }
    }

    render() {
        let s = this.state
        return (
            <div id='blur-container'>
                <Logo id='logo'/>
                <input id = 'team-number-input'
                    type='text'
                    onChange={this.handleChange}
                    value={s.teamNumber}
                    onKeyDown={this.handleKeyDown}
                    style={{
                        color: this.colorCheck()
                    }}/>
                <button id = 'login-connect'
                    style={{opacity: s.teamNumber.length == 4 ? 1 : 0}}
                    onClick={this.handleClickConnect}
                >
                    {this.props.connecting ? 'Connecting' : 'Connect'}
                </button>
            </div>
        )
    }
}