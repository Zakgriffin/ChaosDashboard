import React, {useState, useEffect} from 'react'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import './Simulation.css'
import NetworkTables from '../../network/networktables'
//import NetworkTables from '../network/networktables'
/*
interface IProps {}
interface IState {
    fullscreen: boolean
    size: {x: number, y: number}
    resolution: number
    scale: number
    renderer: THREE.WebGLRenderer | undefined
    simX: number
    simY: number
}
*/
export default function Simulation() {
    /*
    let [fullscreen, setFullscreen] = useState(false),
        [size, setSize] = useState({x: 495, y: 210}),
        [resolution, setResolution] = useState(1),
        [scale, setScale] = useState(2.35),
        [simX, setSimX] = useState(0),
        [simY, setSimY] = useState(0)
    let [others, setOthers] = useState({
        mount: undefined
        robot: undefined
        renderer: undefined
    })

    useEffect(() => {
        NetworkTables.addKeyListener('/SmartDashboard/simX', newSimX => {
            setSimX(newSimX)
        })
        NetworkTables.addKeyListener('/SmartDashboard/simY', newSimY => {
            setSimX(newSimY)
        })

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, size.x/size.y, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(size.x, size.y);
        renderer.setPixelRatio(scale);

        this.mount.appendChild(renderer.domElement)
        this.setState({renderer})

        let light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
        scene.add(light)

        let plane = new THREE.Mesh(
            new THREE.PlaneGeometry(319, 649, 1),
            new THREE.MeshBasicMaterial({color: '#FF0', side: THREE.DoubleSide})
        )
        scene.add(plane)
        plane.rotation.x = Math.PI / 2

        let robot = this.robot

        let animate = () => {
            requestAnimationFrame(animate)
            
            if(this.robot) this.robot.position.set(this.state.simX, 0, this.state.simY)

            controls.update()
            //robot.rotation.y += 0.1

            renderer.render(scene, camera)
            //NetworkTables.putValue('/SmartDashboard/thing', camera.position.x)
        }
        /*
        var geometry = new THREE.BoxBufferGeometry( 30, 30, 30 );
        var edges = new THREE.EdgesGeometry( geometry );
        var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
        scene.add( line );
        */
        //import '../../../models/robot_model/'
        const loader = new GLTFLoader()
        /*
        loader.load('../../../models/robot_model', (gltf) => {
            console.log(gltf)
            robot = gltf.scene.children[0].children[0].children[0]

            robot.position.set(5, 33, -93)
            let scale = 0.4
            robot = new THREE.Object3D().add(robot)
            robot.scale.set(scale, scale, scale)
            this.robot = robot
            scene.add(robot)

            animate()
        }, undefined, function (error) {
            console.error(error)
        })
        */
/*
        let controls = new OrbitControls(camera, renderer.domElement)
        //controls.addEventListener('change', render) // call this only in static scenes (i.e., if there is no animation loop)
        controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.3
        controls.screenSpacePanning = false
        controls.minDistance = 10
        controls.maxDistance = 400
        controls.maxPolarAngle = Math.PI / 2 - 0.1

        camera.position.z = 300
        /*
        NetworkTables.addKeyListener('/SmartDashboard/test', (value) => {
            robot.rotation.y = value / 10
        })*/
        /*
        animate()
    }

    function toggleFullscreen = () => {
        let s = this.state
        this.setState({fullscreen: !s.fullscreen})
        
        if(!s.renderer) return
        if(s.fullscreen) {
            s.renderer.setPixelRatio(s.resolution);
            s.renderer.setSize(s.size.x, s.size.y);
        } else {
            s.renderer.setPixelRatio(s.resolution * s.scale);
            s.renderer.setSize(s.size.x * s.scale, s.size.y * s.scale);
        }
    }

    return (
        <div id='simulation'
            ref={ref => (this.mount = ref)}
            onDoubleClick={this.toggleFullscreen}
        />
    )
    */
   return <div></div>
}