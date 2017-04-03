/**
 * Created by ZZQ on 2017/4/2.
 */
(function() {

    // init renderer
    let renderer = new THREE.WebGLRenderer({antialias: true});
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

    // make plane
    let plane = new THREE.Mesh(new THREE.PlaneGeometry(10,10), new THREE.MeshPhongMaterial({color: 0x90ee90}));
    plane.rotation.x = -Math.PI/2;
    plane.position.y = -1.4;
    plane.receiveShadow = true;
    scene.add(plane);

    // make car
    let carMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
    let body = new THREE.Mesh(new THREE.CubeGeometry(4,2,2), carMaterial);
    body.castShadow = true;
    scene.add(body);
    let wheelPositions = [[-1.2,-1,1],[-1.2,-1,-1],[1.2,-1,1],[1.2,-1,-1]];
    for (let wheelPosition of wheelPositions) {
        let wheel = new THREE.Mesh(new THREE.TorusGeometry(0.3,0.1,20,20), carMaterial);
        wheel.position.set(wheelPosition[0],wheelPosition[1],wheelPosition[2]);
        wheel.castShadow = true;
        scene.add(wheel);
    }

    // light up
    let ambientLight = new THREE.AmbientLight(0x666666);
    scene.add(ambientLight);
    let directionalLight = new THREE.DirectionalLight(0x666666);
    directionalLight.position.set(-6,3,6);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // render
    renderer.render(scene, camera);

}());