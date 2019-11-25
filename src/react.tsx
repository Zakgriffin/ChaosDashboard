// src/react.tsx
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.d'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.d'
//import App from './components/App'

export default class App extends React.Component {
    private mount: HTMLDivElement

    componentDidMount() {
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
        camera.position.z = 300
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)
        this.mount.appendChild(renderer.domElement)

        var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
        scene.add(light)

        var plane = new THREE.Mesh(
            new THREE.PlaneGeometry(319, 649, 1),
            new THREE.MeshBasicMaterial({color: '#FF0', side: THREE.DoubleSide})
        )
        scene.add(plane)
        plane.rotation.x = Math.PI / 2

        const loader = new GLTFLoader()
        let robot: THREE.Object3D
        loader.load('./robot_model/scene.gltf', function (gltf) {
            robot = gltf.scene.children[0].children[0].children[0]
            console.log(robot)

            robot.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0))
            //robot.translate(0, 0, 500)

            var bbox = new THREE.Box3().setFromObject(robot)
            
            scene.add(robot)
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

        let animate = function () {
            requestAnimationFrame(animate)
            
            controls.update()
            robot.rotation.y += 0.01

            renderer.render(scene, camera)
        }
        animate()
    }

    render() {
        return (
            <div ref={ref => (this.mount = ref)} />
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))