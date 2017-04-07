/**
 * Created by ZZQ on 2017/4/3.
 */
(function() {

    // init renderer
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setClearColor(0x666666);
    renderer.shadowMap.enabled = true;

    document.body.appendChild(renderer.domElement);

    // init scene
    let scene = new THREE.Scene();

    // init camera
    let camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,100);
    camera.position.set(4,3,5);
    camera.lookAt(new THREE.Vector3(0,0,0));
    scene.add(camera);

    // init texture loader
    let textureLoader = new THREE.TextureLoader();

    // make plane
    let planeTexture = textureLoader.load("images/wood.jpg", () => render());
    let plane = new THREE.Mesh(new THREE.PlaneGeometry(10,10), new THREE.MeshPhongMaterial({ map: planeTexture, specular: 0xffffff, side: THREE.DoubleSide }));
    plane.rotation.x = -Math.PI/2;
    plane.position.y = -1.4;
    plane.receiveShadow = true;
    scene.add(plane);

    // make vehicle
    let vehicle = new THREE.Group();
    let bodyTexture = textureLoader.load("images/metal.jpg", () => render());
    let body = new THREE.Mesh(new THREE.CubeGeometry(4,2,2), new THREE.MeshPhongMaterial({ map: bodyTexture, specular: 0xffffff }));
    body.castShadow = true;
    vehicle.add(body);
    let wheelPositions = [[-1.2,-1,1],[-1.2,-1,-1],[1.2,-1,1],[1.2,-1,-1]];
    let wheelTexture = textureLoader.load("images/wheel.jpg", texture => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.set(4,1);
        render();
    });
    for (let wheelPosition of wheelPositions) {
        let wheel = new THREE.Mesh(new THREE.TorusGeometry(0.3,0.1,20,20), new THREE.MeshPhongMaterial({ map: wheelTexture }));
        wheel.position.set(wheelPosition[0],wheelPosition[1],wheelPosition[2]);
        wheel.castShadow = true;
        vehicle.add(wheel);
    }
    scene.add(vehicle);

    // light up
    let ambientLight = new THREE.AmbientLight(0x666666);
    scene.add(ambientLight);
    let directionalLight = new THREE.DirectionalLight(0x666666);
    directionalLight.position.set(-12,3,6);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // bind events
    window.addEventListener("resize", function () {
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth,window.innerHeight);
        render();
    });

    // render
    render();

    // helper functions
    function render() {
        renderer.render(scene, camera);
    }

}());
