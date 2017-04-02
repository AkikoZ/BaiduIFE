/**
 * Created by ZZQ on 2017/4/2.
 */
(function() {

    // init renderer
    let renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(1000,600);
    renderer.setClearColor(0x666666);
    document.body.appendChild(renderer.domElement);

    // init scene
    let scene = new THREE.Scene();

    // init camera
    let camera = new THREE.PerspectiveCamera(45,1000/600,1,100);
    camera.position.set(4,3,5);
    camera.lookAt(new THREE.Vector3(0,0,0));
    scene.add(camera);

    // make car
    let whiteFrame = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
    let body = new THREE.Mesh(new THREE.CubeGeometry(4,2,2), whiteFrame);
    scene.add(body);
    let wheelPositions = [[-1.2,-1,1],[-1.2,-1,-1],[1.2,-1,1],[1.2,-1,-1]];
    for (let wheelPosition of wheelPositions) {
        let wheel = new THREE.Mesh(new THREE.TorusGeometry(0.3,0.1,20,20), whiteFrame);
        wheel.position.set(wheelPosition[0],wheelPosition[1],wheelPosition[2]);
        scene.add(wheel);
    }

    // render
    renderer.render(scene, camera);

}());