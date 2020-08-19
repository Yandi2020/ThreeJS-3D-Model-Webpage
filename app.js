// Variables for Setting

let container;
let scene;
let camera;
let renderer;
let character;

//init function
function init(){
    container = document.querySelector('.scene');

    // create scene with three.js
    scene = new THREE.Scene();

    // create field of view, how wide of the angle we can see 
    const fov = 15;
    // the whole container on screen we want to see
    const aspect = container.clientWidth / container.clientHeight;
    // near and far clipping, out of this range we cannot see the scene
    const near = 0.1;
    const far = 1000;

    //camera set up
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(-3, 0, 18);

    //add light to model to see details, what color of light, how strong is the light
    
    //ambient just illuminate the environment equally
    const ambient = new THREE.AmbientLight(0X404040, 3);
    scene.add(ambient);

    //direction light casts shadow away
    const light = new THREE.DirectionalLight(0Xffffff, 3);
    light.position.set(10, 10, 10);
    scene.add(light);

    //renderer, alpha allows to add background and see the model
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // inject a canvas into html page
    container.appendChild(renderer.domElement);

    // load 3D Model
    let loader = new THREE.GLTFLoader();
    
    loader.load('3D/scene.gltf', (gltf) => {
        scene.add(gltf.scene);
        character = gltf.scene.children[0];
        animate();
    })

}

function animate(){
    requestAnimationFrame(animate);
    character.rotation.z += 0.01;
    renderer.render(scene, camera);
}

init();

//window resize

function onWindowResize(){
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', onWindowResize);

