import * as React from 'react';
import Simulation from './Simulation'
import ConnectWidget from './ConnectWidget';

export default class App extends React.Component {
    render() {
        return (
            <div style = {{
                    font: '16px sans-serif',
                    userSelect: 'none',
                    color: 'white',
                    overflow: 'hidden',
                    background: '#222',
                    margin: 0
                }}>
                <ConnectWidget/>
                <Simulation/>
            </div>
        )
    }
}