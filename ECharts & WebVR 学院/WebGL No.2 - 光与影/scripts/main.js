/**
 * Created by ZZQ on 2017/4/2.
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

    // make plane
    let plane = new THREE.Mesh(new THREE.PlaneGeometry(10,10), new THREE.MeshPhongMaterial({ color: 0x90ee90 }));
    plane.rotation.x = -Math.PI/2;
    plane.position.y = -1.4;
    plane.receiveShadow = true;
    scene.add(plane);

    // make vehicle
    let vehicle = new THREE.Group();
    let vehicleMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    let body = new THREE.Mesh(new THREE.CubeGeometry(4,2,2), vehicleMaterial);
    body.castShadow = true;
    vehicle.add(body);
    let wheelPositions = [[-1.2,-1,1],[-1.2,-1,-1],[1.2,-1,1],[1.2,-1,-1]];
    for (let wheelPosition of wheelPositions) {
        let wheel = new THREE.Mesh(new THREE.TorusGeometry(0.3,0.1,20,20), vehicleMaterial);
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
    renderer.render(scene, camera);

}());