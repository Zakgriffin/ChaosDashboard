import React/*, {useState, useEffect, useRef} */from 'react'
/*
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import './Simulation.css'
import NetworkTables from '../../network/networktables'
*/

export default function Simulation() {
    /*
    const mountRef = useRef<HTMLDivElement>()

    let [fullscreen, setFullscreen] = useState(false),
        [size, setSize] = useState({x: 495, y: 210}),
        [resolution, setResolution] = useState(1),
        [scale, setScale] = useState(2.35),
        [simX, setSimX] = useState(0),
        [simY, setSimY] = useState(0)
    let [others, setOthers] = useState({
        mount: undefined,
        robot: undefined,
        renderer: undefined
    })
    let [robot, setRobot] = useState<THREE.Object3D>()
    let [renderer, setRenderer] = useState<THREE.WebGLRenderer>()

    useEffect(() => {
        NetworkTables.addKeyListener('/SmartDashboard/simX', newSimX => {
            setSimX(newSimX)
        })
        NetworkTables.addKeyListener('/SmartDashboard/simY', newSimY => {
            setSimX(newSimY)
        })
    }, [])

    useEffect(() => {
        const canvas = document.createElement('canvas')
        const mount = mountRef.current
        mount.appendChild(canvas)

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, size.x/size.y, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer()

        renderer.setSize(size.x, size.y);
        renderer.setPixelRatio(scale);

        let light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
        scene.add(light)

        let plane = new THREE.Mesh(
            new THREE.PlaneGeometry(319, 649, 1),
            new THREE.MeshBasicMaterial({color: '#FF0', side: THREE.DoubleSide})
        )
        scene.add(plane)
        plane.rotation.x = Math.PI / 2

        let animate = () => {
            requestAnimationFrame(animate)
            
            if(robot) robot.position.set(simX, 0, simY)

            controls.update()
            //robot.rotation.y += 0.1

            renderer.render(scene, camera)
            //NetworkTables.putValue('/SmartDashboard/thing', camera.position.x)
        }

        let controls = new OrbitControls(camera, renderer.domElement)

        controls.enableDamping = true
        controls.dampingFactor = 0.3
        controls.screenSpacePanning = false
        controls.minDistance = 10
        controls.maxDistance = 400
        controls.maxPolarAngle = Math.PI / 2 - 0.1

        camera.position.z = 300

        NetworkTables.addKeyListener('/SmartDashboard/test', (value) => {
            if(!robot) return
            robot.rotation.y = value / 10
        })

        const loader = new GLTFLoader()
        
        loader.load('../../../models/robot_model', (gltf) => {
            setRobot(gltf.scene.children[0].children[0].children[0])
            if(!robot) return
            robot.position.set(5, 33, -93)
            let scale = 0.4
            robot = new THREE.Object3D().add(robot)
            robot.scale.set(scale, scale, scale)
            scene.add(robot)

            animate()
        }, undefined, function(error) {
            console.error(error)
        })
    }, [])

    function toggleFullscreen() {
        setFullscreen(!fullscreen)
        if(!renderer) return
        if(fullscreen) {
            renderer.setPixelRatio(resolution);
            renderer.setSize(size.x, size.y);
        } else {
            renderer.setPixelRatio(resolution * scale);
            renderer.setSize(size.x * scale, size.y * scale);
        }
    }

    return (
        <canvas id='simulation'
            ref = {}
            onDoubleClick={toggleFullscreen}
        />
    )
    */
   return <div></div>
}