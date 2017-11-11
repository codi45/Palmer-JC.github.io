//full path so can run on chrome during dev
var commonAudioDir = "https://palmer-jc.github.io/audio";
var audioDir = "https://palmer-jc.github.io/scenes/blow_me_baby/audio";

var scene;
var camera;
var camLight;
var initialCamPos = new BABYLON.Vector3(-30, 9, 0);
var initialCamRot = new BABYLON.Vector3(0, Math.PI / 2, 0);

var finalCamPos = new BABYLON.Vector3(0, 9, -30);
var finalCamRot = new BABYLON.Vector3(0, 0, 0);

var butterflies = new Array(94);
var bodyDim = 1.5;
var width = bodyDim * 5.5; // includes space between
var leftMost = -1 * (width * 4);
var rightMost;
var deck = 2;
var ceiling = deck + (bodyDim * 5);

var nate;

function onAppReady() {
    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        navigator.splashscreen.hide() ;
    }
    
    if (BABYLON.Engine.isSupported()) {
	    var canvas = document.getElementById("renderCanvas");
	    canvas.screencanvas = true; // for CocoonJS
	    var engine = new BABYLON.Engine(canvas, true, { stencil: true });
	
	    scene = new BABYLON.Scene(engine);
	    scene.clearColor = new BABYLON.Color3(.5,.5,.5);
	    
        camera = new BABYLON.FreeCamera("Camera", initialCamPos, scene);
        camera.rotation = initialCamRot;

        // launch GUI
        var launchTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        var launchPanel = new BABYLON.GUI.StackPanel();
        launchPanel.width = "200px";
        launchPanel.isVertical = true;
        launchPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        launchPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        launchTexture.addControl(launchPanel);

        var launchBtn = BABYLON.GUI.Button.CreateSimpleButton("launchBtn", "Launch");
        launchBtn.width = "150px"
        launchBtn.height = "40px";
        launchBtn.color = "white";
        launchBtn.cornerRadius = 20;
        launchBtn.background = "orange";
        launchBtn.onPointerUpObservable.add(function() {
        	launchTexture.dispose();
            launch();
        });
        launchPanel.addControl(launchBtn);    
	    
	    engine.runRenderLoop(function () {
	        scene.render();
	    });
	    
	    preloading();
	    
    }else{
        alert("WebGL not supported in this browser.");
    }

    //Resize
    window.addEventListener("resize", function () {
        engine.resize();
    })
}

function launch() {
        camlight = new BABYLON.PointLight("camLight", BABYLON.Vector3.Zero(), scene);        
        // still works if the active camera gets switched out; not used till later
        scene.beforeCameraRender = function () {
            var cam = (scene.activeCameras.length > 0) ? scene.activeCameras[0] : scene.activeCamera;
            // move the light to match where the camera is
            camlight.position = cam.position;
            camlight.rotation = cam.rotation;
        }; 
        
	    nate.setEnabled(true);
	    nate.entranceMethod = null;
	    nate.grandEntrance();
	    
	    var ground = BABYLON.Mesh.CreatePlane("ground", 1000, scene);
	    ground.rotation.x = Math.PI / 2;
	    ground.material = new BABYLON.ShadowOnlyMaterial('mat', scene)
	    ground.receiveShadows = true
        camlight.excludedMeshes = [ground];
                
	    var shadowLight = new BABYLON.DirectionalLight('shadowlight', new BABYLON.Vector3(0, 40, -25), scene);
	    shadowLight.intensity = 0; // used only for shadows
        var shadowGenerator = new BABYLON.ShadowGenerator(2048, shadowLight);
        shadowGenerator.useBlurExponentialShadowMap = true;
        shadowGenerator.blurScale = 2;
        shadowGenerator.setDarkness(0.1);
        freshenShadowRenderLists(scene);   
        
 //       QI.TimelineControl.Speed = .1;
        var camDuration = 0;
        nate.queuePose("extraction-2", 500, null, null, {millisBefore: 2000}); camDuration += 500;
        nate.queuePose("extraction-3", 400); camDuration += 400;
        nate.queuePose("extraction-4", 400); camDuration += 400;
        nate.queuePose("extraction-5", 400); camDuration += 500;
        nate.queuePose("extraction-6", 500); camDuration += 500;
        nate.queuePose("extraction-7", 800); camDuration += 800;
        nate.queuePose("extraction-8", 500);
        nate.queuePose("extraction-9", 800);
        nate.queuePose("extraction-8", 900);
        nate.queuePose("do-not", 400);
        nate.queuePose("go-in-there", 200);
        
        doCameraAnimation(camDuration, 2000);

}
//======================================= Pre-loading =========================================
var windSnd;
var whatTheSnd;
var clickSnd;
function preloading() {
//	windSnd    = new BABYLON.Sound("wind"    , commonAudioDir + "/wind.mp3", scene, null, {loop: true});
//	whatTheSnd = new BABYLON.Sound("what_the", audioDir       + "/what_the.mp3", scene);
//	clickSnd   = new BABYLON.Sound("click"   , commonAudioDir + "/click.mp3", scene);
    nate = new Nate.Nate_Male_muscle_13290("nate", scene, "../../characters/images/");
    nate.setEnabled(false);
    nate.addStockExpressions("", true);
	nate.removeExpressionComponents();
	nate.assignPoseLibrary("HD-Extraction");
    nate.assignPoseImmediately("extraction-1");
    nate.deformImmediately("R_HAND", "FINGERS_TOGETHER");
    nate.deformImmediately("L_HAND", "FINGERS_TOGETHER");

	nate.compileMaterials();
}

//from a TOB export with initScene
function freshenShadowRenderLists(scene) {
    var renderList = [];
    for (var i = 0; i < scene.meshes.length; i++){
        if (scene.meshes[i]["castShadows"])
            renderList.push(scene.meshes[i]);
    }

    for (var i = 0; i < scene.lights.length; i++){
        if (scene.lights[i]._shadowGenerator)
            scene.lights[i]._shadowGenerator.getShadowMap().renderList = renderList;
    }
}

function doCameraAnimation(duration, delay) {
    var cameraQueue = new QI.PovProcessor(camera); 

    cameraQueue.queueSingleEvent(
    		new QI.MotionEvent(duration, finalCamPos, finalCamRot, { millisBefore: delay, absoluteMovement : true, absoluteRotation: true } )
    );
}



// this is an XDK event; when not using XDK, place in <body onload="onAppReady()">
document.addEventListener("app.Ready", onAppReady, false) ;