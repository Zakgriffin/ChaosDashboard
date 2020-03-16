import React, {useState, useEffect} from 'react'

export default function ControllerType() {
    const [xboxPath, setXboxPath] = useState('')
    const [taranisPath, setTaranisPath] = useState('')
    const [which, setWhich] = useState(true)

    useEffect(() => {
        import('../ControllerType/xbox.svg').then(graphic => {
            setXboxPath(graphic.default)
        })

        import('../ControllerType/taranis.jpg').then(graphic => {
            setTaranisPath(graphic.default)
        })
    }, [xboxPath, taranisPath])
    return <div>
        <img src={which ? xboxPath : taranisPath} style={{position: 'absolute', width: '90%'}}/>
        <button style={{position: 'absolute',
            width:'20px',
            height: '20px',
            background: which ? 'blue' : 'red',
            top: '20px'
        }} onClick ={() => {
            setWhich(!which)
        }}/>
    </div>
}