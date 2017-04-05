/**
 * Created by ZZQ on 2017/4/5.
 */
(function() {

    // init stats
    let stats = new Stats();
    document.body.appendChild(stats.domElement);

    // init renderer
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(1000,600);
    renderer.setClearColor(0x666666);
    renderer.shadowMap.enabled = true;

    document.body.appendChild(renderer.domElement);

    // init scene
    let scene = new THREE.Scene();

    // init camera
    let camera = new THREE.PerspectiveCamera(45,1000/600,1,100);
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

    // make car
    let car = new THREE.Group();
    let bodyTexture = textureLoader.load("images/metal.jpg", () => render());
    let body = new THREE.Mesh(new THREE.CubeGeometry(4,2,2), new THREE.MeshPhongMaterial({ map: bodyTexture, specular: 0xffffff }));
    body.castShadow = true;
    car.add(body);
    let wheelPositions = [[-1.2,-1,1],[-1.2,-1,-1],[1.2,-1,1],[1.2,-1,-1]];
    let wheelTexture = textureLoader.load("images/wheel.jpg", (texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.set(4,1);
        render();
    });
    for (let wheelPosition of wheelPositions) {
        let wheel = new THREE.Mesh(new THREE.TorusGeometry(0.3,0.1,20,20), new THREE.MeshPhongMaterial({ map: wheelTexture }));
        wheel.position.set(wheelPosition[0],wheelPosition[1],wheelPosition[2]);
        wheel.castShadow = true;
        car.add(wheel);
    }
    scene.add(car);

    // light up
    let ambientLight = new THREE.AmbientLight(0x666666);
    scene.add(ambientLight);
    let directionalLight = new THREE.DirectionalLight(0x666666);
    directionalLight.position.set(-6,3,6);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // init flags
    let moveForward = false;
    let moveBackward = false;
    let turnLeft = false;
    let turnRight = false;

    // bind keys
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
            car.translateX(0.05);
            render();
        }
        if (moveBackward) {
            car.translateX(-0.05);
            render();
        }
        if (turnLeft) {
            car.rotateY(0.01);
            render();
        }
        if (turnRight) {
            car.rotateY(-0.01);
            render();
        }
    }

}());
