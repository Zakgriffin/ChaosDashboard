// Heavy work in progress translating from FRC Dashboard original

import * as React from 'react'
import NetworkTables from '../network/networktables'
import {ipcRenderer as ipc} from 'electron'

interface IProps {}
interface IState {
    loginShown: boolean
    connectedState: string
    addressValue: string
    connectText: string
    addressDisabled: boolean
}

  
export default class ConnectWidget extends React.Component<IProps, IState> {
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
    
    componentDidMount = () => {
        // Set function to be called when robot dis/connects
        NetworkTables.addRobotConnectionListener(this.onRobotConnection, false)
        this.setLogin()
    }

    onRobotConnection = (connected: boolean) => {
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

    setLogin = () => {
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
        NetworkTables.tryToConnect(this.state.addressValue)
    }

    // On click try to connect and disable the input and the button
    onKeyDown_address = ev => {
        if(ev.key === 'Enter') {
            this.onClick_connect()
            ev.preventDefault()
            ev.stopPropagation()
        }
    }
    
    handleInputChange_address = e => {
        this.setState({addressValue: e.target.value})
    }

    render = () => {
        let s = this.state
        return (
            <div>
                <div
                    id='login'
                    style={{
                        visibility: s.loginShown ? 'visible' : 'hidden',

                        position: 'fixed',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)'
                    }}
                >
                    <input
                        id = 'connect-address'
                        type = 'text'
                        value = {s.addressValue}
                        autoFocus
                        onKeyDown = {this.onKeyDown_address}
                        onChange = {this.handleInputChange_address}
                        style = {{
                            color: 'white',
                            background: '#444',
                            border: 'none',
                            fontSize: '14px',
                            padding: '6px 8px',
                            cursor: 'pointer',
                            outline: 0
                        }}
                    />
                    <button
                        id = 'connect'
                        onClick = {this.onClick_connect}
                        disabled = {s.addressDisabled}
                        style = {{
                            color: 'white',
                            background: '#444',
                            border: 'none',
                            fontSize: '14px',
                            padding: '6px 8px',
                            cursor: 'pointer',
                            outline: 0,
                            height: '40px',
                            width: '100px'
                        }}
                    >{s.connectText}</button>
                </div>
                <div>
                    <div id = 'robot-state'> {s.connectedState} </div>
                    <button
                        id = 'connect-button'
                        onClick = {this.onClick_buttonConnect}
                        value = 'Connect'
                    />
                </div>
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