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

    const [leftWheelAngle] = useNetworkTable('leftWheelAngle', 0)
    const [rightWheelAngle] = useNetworkTable('rightWheelAngle', 0)

    const leftDistLast = useRef(0)
    const rightDistLast = useRef(0)

    const [pos, setPos] = useState([0, -14, 150])
    const [rot, setRot] = useState([0, 0, 0])

    const timeDelta = 0.1 // seconds
    useInterval(() => {
        const leftDist = -leftWheelAngle * 20
        const rightDist = -rightWheelAngle * 20

        const leftChange = leftDist - leftDistLast.current
        const rightChange = rightDist - rightDistLast.current
        //                                         inches per timeDelta
        const {changePos, angle} = getTankChange(leftChange, rightChange, timeDelta)
        const changePosRotated = rotateAroundY(changePos, -rot[1])
        const newPos = changePosRotated.map((num, i) => num + pos[i])

        const newRot = [...rot]
        newRot[1] -= angle

        setPos(newPos)
        setRot(newRot)

        leftDistLast.current = leftDist
        rightDistLast.current = rightDist
    }, timeDelta * 1000)

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

function getTankChange(l: number, r: number, t: number): {changePos: number[], angle: number} {
    const d = 20

    let lrDif = l - r
    if(lrDif === 0) {
        // straight forward
        return {changePos: [0, 0, l], angle: 0}
    }
    let radiusLeft = (l * d) / lrDif
    let radiusRight = (r * d) / lrDif
    let angle = (lrDif * t) / d

    let radiusSum = radiusLeft + radiusRight
    let changeX = (-radiusSum * Math.cos(angle) + radiusSum) / 2
    let changeZ = (radiusSum * Math.sin(angle)) / 2

    return {
        changePos: [changeX, 0, changeZ],
        angle
    }
}

function rotateAroundY(point: number[], angle: number): number[] {
    let [x, y, z] = point
    let sinA = Math.sin(angle)
    let cosA = Math.cos(angle)

    let rotX = x * cosA - z * sinA
    let rotZ = x * sinA + z * cosA

    return [rotX, y, rotZ]
}

function useInterval(callback: () => void, delay: number) {
    const savedCallback = useRef(callback);
  
    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if(delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}