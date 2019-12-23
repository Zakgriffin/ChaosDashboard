import React, { useRef } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import './Simulation.css'

function Thing() {
    const ref = useRef()
    useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01))
    return (
        <mesh ref={ref}>
            <planeGeometry attach="geometry" args={[319, 649, 1]}/>
            <meshPhongMaterial attach="material" color='#FF0'/>
        </mesh>
    )
}

export default function Sim2() {
    return (
        <div id='simulation'>
            <Canvas>
                <Thing/>
            </Canvas>
        </div>
    )
}