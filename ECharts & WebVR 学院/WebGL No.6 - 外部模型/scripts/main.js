/**
 * Created by ZZQ on 2017/4/5.
 */
(function() {

    // init stats
    let stats = new Stats();
    document.body.appendChild(stats.domElement);

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

    // init controls
    let controls = new THREE.TrackballControls(camera);
    controls.staticMoving = true;
    controls.addEventListener("change", render);

    // init texture loader
    let textureLoader = new THREE.TextureLoader();

    // make plane
    let planeTexture = textureLoader.load("images/wood.jpg", () => render());
    let plane = new THREE.Mesh(new THREE.PlaneGeometry(20,20), new THREE.MeshPhongMaterial({ map: planeTexture, specular: 0xffffff, side: THREE.DoubleSide }));
    plane.rotation.x = -Math.PI/2;
    plane.position.y = -1.4;
    plane.receiveShadow = true;
    scene.add(plane);

    // load vehicle
    let vehicle;
    let vehicleModelPath = "models/vehicle/";
    let mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath(vehicleModelPath);
    mtlLoader.load("vehicle.mtl", materials => {
        materials.preload();
        let objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath(vehicleModelPath);
        objLoader.load("vehicle.obj", object => {
            vehicle = object;
            vehicle.position.set(0,-1.4,0);
            vehicle.scale.set(0.05,0.05,0.05);
            vehicle.traverse(child => {
                if (child instanceof THREE.Mesh)
                    child.castShadow = true;
            });
            scene.add(vehicle);
            render();
        });
    });

    // light up
    let ambientLight = new THREE.AmbientLight(0x666666);
    scene.add(ambientLight);
    let directionalLight = new THREE.DirectionalLight(0x666666);
    directionalLight.position.set(-12,3,6);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -15;
    directionalLight.shadow.camera.right = 15;
    scene.add(directionalLight);

    // init flags
    let moveForward = false;
    let moveBackward = false;
    let turnLeft = false;
    let turnRight = false;

    // bind events
    window.addEventListener("resize", function () {
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth,window.innerHeight);
        controls.handleResize();
        render();
    });

    document.body.onkeyup = function (e) {
        switch (e.keyCode) {
            case 87: moveForward = false; break;
            case 65: turnLeft = false; break;
            case 83: moveBackward = false; break;
            case 68: turnRight = false; break;
        }
    };

    document.body.onkeydown = function (e) {
        switch (e.keyCode) {
            case 87: moveForward = true; break;
            case 65: turnLeft = true; break;
            case 83: moveBackward = true; break;
            case 68: turnRight = true; break;
        }
    };

    // render
    render();
    animate();

    // helper functions
    function render() {
        renderer.render(scene, camera);
        stats.update();
    }

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        if (moveForward) {
            vehicle.translateX(-0.05);
            render();
        }
        if (moveBackward) {
            vehicle.translateX(0.05);
            render();
        }
        if (turnLeft) {
            vehicle.rotateY(0.01);
            render();
        }
        if (turnRight) {
            vehicle.rotateY(-0.01);
            render();
        }
    }

}());
