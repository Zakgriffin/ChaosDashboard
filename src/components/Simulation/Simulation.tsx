import React, {useRef, Suspense} from 'react'
import {extend, Canvas, useThree, useLoader} from 'react-three-fiber'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import './Simulation.css'

extend({ OrbitControls })

function Scene() {
    const orbit = useRef()
    const {camera, gl} = useThree()

    return <>
        <mesh visible position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry attach='geometry' args={[319, 649, 1]}/>
            <meshBasicMaterial attach='material' color='yellow'/>
        </mesh>

        <Suspense fallback={
            <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
                <sphereGeometry attach='geometry' args={[1, 16, 16]}/>
                <meshBasicMaterial attach='material' color='hotpink'/>
            </mesh>
        }>
            <Asset url='/models/field.glb'/>
        </Suspense>

        <orbitControls ref={orbit}
            args={[camera, gl.domElement]}
            enableDamping
            dampingFactor={0.4}
            rotateSpeed={1}
            maxPolarAngle={Math.PI / 2 - 0.1}
            minDistance={10}
            maxDistance={400}
    />
    </>
}

function Sim(props: any) {
    return (
        <Canvas style={{
            border: '1px solid red'
        }}>
            <Scene/>
        </Canvas>
    )
}

function Asset({url}: any) {
    const gltf = useLoader(GLTFLoader, url)
    return <primitive object={gltf.scene}/>
}
  

export default Sim