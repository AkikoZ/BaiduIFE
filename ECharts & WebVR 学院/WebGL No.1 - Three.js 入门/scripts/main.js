/**
 * Created by ZZQ on 2017/4/2.
 */
(function() {

    // init renderer
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setClearColor(0x666666);
    document.body.appendChild(renderer.domElement);

    // init scene
    let scene = new THREE.Scene();

    // init camera
    let camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,100);
    camera.position.set(4,3,5);
    camera.lookAt(new THREE.Vector3(0,0,0));
    scene.add(camera);

    // make vehicle
    let vehicle = new THREE.Group();
    let vehicleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    let body = new THREE.Mesh(new THREE.CubeGeometry(4,2,2), vehicleMaterial);
    vehicle.add(body);
    let wheelPositions = [[-1.2,-1,1],[-1.2,-1,-1],[1.2,-1,1],[1.2,-1,-1]];
    for (let wheelPosition of wheelPositions) {
        let wheel = new THREE.Mesh(new THREE.TorusGeometry(0.3,0.1,20,20), vehicleMaterial);
        wheel.position.set(wheelPosition[0],wheelPosition[1],wheelPosition[2]);
        vehicle.add(wheel);
    }
    scene.add(vehicle);

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