import React, {useState} from 'react';
import './Login.css'
import Logo from '../../../Logo';

interface IProps {
    tryLogin: (num: number) => void
    connecting: boolean
}

export default function Login(props: IProps) {
    let [inputNumber, setInputNumber] = useState('')

    const handleChange = (e: any) => {
        let val = e.target.value.trim()
        if(val.length <= 4 && !isNaN(val)) {
            setInputNumber(val)
        }
    }

    const colorCheck = () => {
        let num = inputNumber
        if(num === '2458') {
            return '#4a86e8'
        } else if(num.length === 4) {
            return '#26b145'
        }
        return 'orange'
    }

    const handleClickConnect = () => {
        props.tryLogin(parseInt(inputNumber))
    }

    const handleKeyDown = (ev: { key: string }) => {
        if(ev.key === 'Enter') {
            handleClickConnect()
        }
    }

    return <div id='blur-container'>
        <Logo id='logo'/>
        <input id = 'team-number-input'
            type='text'
            onChange={handleChange}
            value={inputNumber}
            onKeyDown={handleKeyDown}
            style={{
                color: colorCheck()
            }}/>
        <button id = 'login-connect'
            style={{opacity: inputNumber.length === 4 ? 1 : 0}}
            onClick={handleClickConnect}
        >
            {props.connecting ? 'Connecting' : 'Connect'}
        </button>
    </div>
}