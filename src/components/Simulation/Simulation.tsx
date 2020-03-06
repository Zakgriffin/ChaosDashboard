import React, {useRef, Suspense, useEffect, useState} from 'react'
import {extend, Canvas, useThree, useLoader} from 'react-three-fiber'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import './Simulation.css'
import useNetworkTable from '../../network/useNetworkTable'

extend({OrbitControls})

export default function Sim(props: any) {
    return <Canvas>
        <Scene/>
    </Canvas>
}

function Scene() {
    const orbit = useRef<JSX.IntrinsicElements['orbitControls']>()
    const {camera, gl} = useThree()

    const leftWheelAngle = useNetworkTable('leftWheelAngle', 0)
    const rightWheelAngle = useNetworkTable('rightWheelAngle', 0)

    const leftWheelAngleLast = useRef(0)
    const rightWheelAngleLast = useRef(0)

    const [pos, setPos] = useState([0, -14, 150])
    const [rot, setRot] = useState([0, 0, 0])

    useEffect(() => {
        const i = setInterval(() => {
            const {newPos, angle} = getUpdatedPos(pos, 15, 10, 0.2)
            pos[0] = newPos[0]
            pos[1] = newPos[1]
            pos[2] = newPos[2]

            rot[1] = angle

            console.log(pos)
            setPos([...pos])
            setRot([...rot])
        }, 1000)
        
        return () => clearInterval(i)
    }, [])

    useEffect(() => {
        camera.position.set(0, 100, 240)
        orbit.current.target.set(0, 0, 150)
        orbit.current.update()
    }, [])

    return <>
        <Suspense fallback={
            // field
            <mesh visible position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry attach='geometry' args={[319, 649, 1]}/>
                <meshBasicMaterial attach='material' color='gray'/>
            </mesh>
        }>
            <Asset
                url='/models/field.glb'
                other={{
                    scale: [30, 30, 30]
                }}
            />
        </Suspense>

        <Suspense fallback={
            // robot
            <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
                <sphereGeometry attach='geometry' args={[1, 16, 16]}/>
                <meshBasicMaterial attach='material' color='hotpink'/>
            </mesh>
        }>
            <Asset
                url='/models/robot_model/scene.gltf'
                other={{
                    scale: [0.3, 0.3, 0.3],
                    rotation: rot,
                    position: pos
                }}
            />
        </Suspense>

        <orbitControls ref={orbit}
            args={[camera, gl.domElement]}
            enableDamping
            dampingFactor={0.4}
            rotateSpeed={1}
            maxPolarAngle={Math.PI / 2 - 0.1}
            minDistance={10}
            maxDistance={400}
            height={200}
        />

        <Lights
            type='AmbientLight'
            color={0xffffff}
            intensity={0.8}
            position={[0, 0, 0]}
        />
    </>
}

function Asset(props: {url: string, other: any}) {
    const gltf = useLoader(GLTFLoader, props.url)
    return <primitive {...props.other} object={gltf.scene}/>
}

function Lights(props: any) {
    const {type} = props
    const Light = type
    return <Light {...props} />
}

function getUpdatedPos(lastPos: number[], l: number, r: number, t: number): {newPos: number[], angle: number} {
    const [x, y, z] = lastPos
    const d = 20

    let lrDif = l - r
    let radiusLeft = (l * d) / lrDif
    let radiusRight = (r * d) / lrDif
    let angle = (lrDif * t) / d

    let radiusSum = radiusLeft + radiusRight
    let newX = (-radiusSum * Math.cos(angle) + radiusSum) / 2
    let newZ = (radiusSum * Math.sin(angle)) / 2

    return {
        newPos: [x + newX, y, z + newZ],
        angle
    }
}