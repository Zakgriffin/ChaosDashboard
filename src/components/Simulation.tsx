import * as React from 'react';
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

export default class Simulation extends React.Component {
    private mount: HTMLDivElement
    private robot: THREE.Object3D

    componentDidMount() {
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer()

        renderer.setSize(window.innerWidth, window.innerHeight)
        this.mount.appendChild(renderer.domElement)

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
            
            controls.update()
            robot.rotation.y += 0.1

            renderer.render(scene, camera)
        }
        /*
        var geometry = new THREE.BoxBufferGeometry( 30, 30, 30 );
        var edges = new THREE.EdgesGeometry( geometry );
        var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
        scene.add( line );
        */

        const loader = new GLTFLoader()
        loader.load('../models/robot_model/scene.gltf', function (gltf) {
            robot = gltf.scene.children[0].children[0].children[0]

            robot.position.set(5, 33, -93)
            let scale = 0.4
            robot = new THREE.Object3D().add(robot)
            robot.scale.set(scale, scale, scale)
            scene.add(robot)

            animate()
        }, undefined, function (error) {
            console.error(error)
        })

        let controls = new OrbitControls(camera, renderer.domElement)
        //controls.addEventListener('change', render) // call this only in static scenes (i.e., if there is no animation loop)
        controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.3
        controls.screenSpacePanning = false
        controls.minDistance = 10
        controls.maxDistance = 400
        controls.maxPolarAngle = Math.PI / 2 - 0.1

        camera.position.z = 300
    }

    render() {
        return (
            <div ref={ref => (this.mount = ref)}/>
        )
    }
}