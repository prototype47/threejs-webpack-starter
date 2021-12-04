import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/textures/NormalMap.png')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture

material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

// light-1
const pointLight1 = new THREE.PointLight(0xffffff, 0.1)
pointLight1.position.x = 2
pointLight1.position.y = 3
pointLight1.position.z = 4
scene.add(pointLight1)

// light-2
const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(-2.15, 0.94, -1.14)
pointLight2.intensity = 10
scene.add(pointLight2)
const light2 = gui.addFolder('Light 2')

light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)
// const pointLightHelper1 = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper1)

// light-3
const pointLight3 = new THREE.PointLight(0x96ff, 2)
pointLight3.position.set(1.57, -1.46, -2.59)
pointLight3.intensity = 6.8
scene.add(pointLight3)
const light3 = gui.addFolder('Light 3')
light3.add(pointLight3.position, 'x').min(-6).max(6).step(0.01)
light3.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
light3.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
const light3Color = {
    color: 0x96ff
}

light3.addColor(light3Color, 'color')
    .onChange(() => {
        pointLight3.color.set(light3Color.color)
    })

light3.add(pointLight3, 'intensity').min(0).max(10).step(0.01)
// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1)
// scene.add(pointLightHelper2)




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)
let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0
const windowX = window.innerWidth /2;  // here we are accessing the width of the actual window (viewport)
const windowY = window.innerHeight /2;
function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX) // we have done subtraction so as to make the scroll smoother
    mouseY = (event.clientY - windowY)
}

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .01
}
window.addEventListener('scroll', updateSphere)

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 2 * elapsedTime // reason why the sphere is moving
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.rotation.y += .05 * (targetX - sphere.rotation.y)
    sphere.position.z += -.14 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()