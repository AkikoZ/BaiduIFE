/**
 * Created by ZZQ on 2017/4/2.
 */
(function() {

    // init renderer
    let renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(1000,600);
    document.getElementsByTagName("body")[0].appendChild(renderer.domElement);
    renderer.setClearColor(0x666666);

    // init scene
    let scene = new THREE.Scene();

    // init camera
    let camera = new THREE.PerspectiveCamera(45,1000/600,1,100);
    camera.position.set(4,3,5);
    camera.lookAt(new THREE.Vector3(0,0,0));
    scene.add(camera);

    // make car
    let body = new THREE.Mesh(new THREE.CubeGeometry(4,2,2), new THREE.MeshBasicMaterial({color: 0xffffff, wireframe:true}));
    scene.add(body);
    let wheelPositions = [[-1.2,-1,1],[-1.2,-1,-1],[1.2,-1,1],[1.2,-1,-1]];
    for (let position of wheelPositions) {
        let wheel = new THREE.Mesh(new THREE.TorusGeometry(0.3,0.1,20,20), new THREE.MeshBasicMaterial({color: 0xffffff, wireframe:true}));
        wheel.position.set(position[0],position[1],position[2]);
        scene.add(wheel);
    }

    // render
    renderer.render(scene, camera);

}());