// Heavy work in progress translating from FRC Dashboard original

import * as React from 'react'
import NetworkTables from '../network/NetworkTables'
import {ipcRenderer as ipc} from 'electron'

interface IProps {}
interface IState {
    loginShown: boolean
    connectedState: string
    addressValue: string
    connectText: string
    addressDisabled: boolean
}

  
export default class Login extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            loginShown: true,
            connectedState: '',
            addressValue: '',
            connectText: '',
            addressDisabled: false
        }
    }
    
    componentDidMount() {
        // Set function to be called when robot dis/connects
        NetworkTables.addRobotConnectionListener(this.onRobotConnection, false)
        this.setLogin()
    }

    onRobotConnection(connected: boolean) {
        this.setState({connectedState: (connected ? 'Robot connected!' : 'Robot disconnected.')})
        console.log(connected)
        
        if(connected) {
            // On connect hide the connect popup
            this.setState({loginShown: false})
        } else if(this.state.loginShown) {
            this.setLogin()
        }
    }

    onClick_buttonConnect = () => {
        this.setState({loginShown: true})
        this.setLogin()
    }

    setLogin() {
        // Add Enter key handler
        // Enable the input and the button

        this.setState({
            addressDisabled: false,
            connectText: 'Connect',
            addressValue: 'roborio-xxxx-frc.local'
        })
        // Add the default address and select xxxx

        //address.focus() COME BACK
        //address.setSelectionRange(8, 12)
    }
    
    onClick_connect = () => {
        this.setState({
            addressDisabled: true,
            connectText: 'Connecting...'
        })
        ipc.send('connect', this.state.addressValue)
    }

    // On click try to connect and disable the input and the button
    onKeyDown_address = ev => {
        if(ev.key === 'Enter') {
            this.onClick_connect()
            ev.preventDefault()
            ev.stopPropagation()
        }
    }
    
    render() {
        let s = this.state
        return (
            <div
                id='login'
                style={{visibility: s.loginShown ? 'visible' : 'hidden'}}>
                <input
                    id = 'connect-address'
                    type = 'text'
                    value = 'localhost'
                    autoFocus
                    onKeyDown = {this.onKeyDown_address}
                    disabled
                />
                <button
                    id = 'connect'
                    onClick = {this.onClick_connect}
                    disabled = {s.addressDisabled}
                    value = 'Connecting'
                />
            </div>
        )
    }
}

/*
let address = document.getElementById('connect-address'),
    connect = document.getElementById('connect'),
    buttonConnect = document.getElementById('connect-button')
*/

/*
// Function for hiding the connect box
onkeydown = key => {
    if(key.key === 'Escape') {
        document.body.classList.toggle('login', false)
        loginShown = false
    }
}
*/

// Show login when starting
//document.body.classList.toggle('login', true)