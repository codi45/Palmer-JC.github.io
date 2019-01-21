/**
 *  called by mesh_parent.html
 */
const duration = 2500;
const nClones = 3;

const delayBetween = duration / (nClones + 1);  //1 for original
let initialInstance;
let kiddies;
let parenting = true;

function initialize(scene){
    materialsRootDir = "./images";
    mesh_parent_pbr.initScene(scene, materialsRootDir); // construct scene

    //retrieve initial Instance of Gus made initScene; store kids; assign beforeRender with no delay
    for (mesh of scene.meshes){
        if (mesh.id.startsWith("Gus")) {
           initialInstance = mesh;
           break;
        }
    }
    kiddies = initialInstance.getChildren();
    assignPOV(initialInstance, 0);

    // add some clones with a delay to animation start
    for (let i = 1; i <= nClones; i++){
        QI.TimelineControl.pauseSystem();
        const clone = QI.Mesh.FactoryClone("mesh_parent_pbr", "Gus", true);
        assignPOV(clone, -1 * delayBetween * i);
    }

    // change material of original
    let material = new BABYLON.StandardMaterial("color for original", scene);
    material.ambientColor  = new BABYLON.Color3(0.6,0.1,0.1);
    material.diffuseColor  = new BABYLON.Color3(0.72,0,0);
    material.specularColor = new BABYLON.Color3(0.5,0.5,0.5);
    material.emissiveColor = new BABYLON.Color3(0,0,0);
    material.specularPower = 50;
    material.alpha =  1;
    material.backFaceCulling = true;
    initialInstance.material = material;
    
    QI.TimelineControl.resumeSystem();
}

function assignPOV(mesh, initialDelay){
    //                                 milli   , go 25 units forward           , over 1 full twirl & tiltRight    , varied start
    const event  = [ new QI.MotionEvent(duration, new BABYLON.Vector3(0,  0, 10), new BABYLON.Vector3(0, 6.28, 6.28), { millisBefore : initialDelay }) ];
    const series  = new QI.EventSeries(event, 1000);  // do 1000 loops
    mesh.queueEventSeries(series);
}

function pausePlay() {
    console.log("Requesting " + (QI.TimelineControl.isSystemPaused ? "resume" : "pause"));
    // test system wide pause-play
    if (QI.TimelineControl.isSystemPaused) QI.TimelineControl.resumeSystem();
    else QI.TimelineControl.pauseSystem();
}

 function orphanConceive() {
    parenting = !parenting;
    for (const kid of kiddies) {
        kid.parent = parenting ? initialInstance : null;
    }
  }

 function freshenShadows() {
    QI.FreshenShadowRenderLists(scene);
 }