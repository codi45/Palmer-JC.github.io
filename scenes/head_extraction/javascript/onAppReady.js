//full path so can run on chrome during dev
var canvas;
var engine;
var scene;
var camera;
var camLight;

var nate;

var gifMaker;

function onAppReady() {
    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        navigator.splashscreen.hide() ;
    }
    
    if (BABYLON.Engine.isSupported()) {
    	QI.GifMaker.librariesLoad("../../lib");
	    canvas = document.getElementById("renderCanvas");
	    canvas.screencanvas = true; // for CocoonJS
	    engine = new BABYLON.Engine(canvas, true, { stencil: true });
	
	    scene = new BABYLON.Scene(engine);
	    scene.clearColor = new BABYLON.Color3(0,1,1);
	    
        nate = new Nate.Nate_Male_muscle_13290("nate", scene, "../../characters/images/");
	    nate.entranceMethod = null;
        nate.addStockExpressions("", true);
    	nate.removeExpressionComponents();
    	nate.assignPoseLibrary("HD-Extraction");
    	
        camera = new QI.CylinderCamera("Camera", true, Math.PI, 30, scene);
        camera.wheelPrecision = 50;	    
        camera.attachControl(canvas);
        camera.setTargetMesh(nate, true);

        camlight = new BABYLON.PointLight("camLight", BABYLON.Vector3.Zero(), scene);        
        // still works if the active camera gets switched out; not used till later
        scene.beforeCameraRender = function () {
            var cam = (scene.activeCameras.length > 0) ? scene.activeCameras[0] : scene.activeCamera;
            // move the light to match where the camera is
            camlight.position = cam.position;
            camlight.rotation = cam.rotation;
        }; 
        
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
        
        createControlPanel();
            	
        engine.runRenderLoop(function () {
	        scene.render();
	    });
	    
    }else{
        alert("WebGL not supported in this browser.");
    }

    //Resize
    window.addEventListener("resize", function () {
        engine.resize();
    })
}

function createControlPanel() {
    var cntrlPnlTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("cntrlPnlTexture");

    var controlPanel = new BABYLON.GUI.StackPanel();
    controlPanel.width = "200px";
    controlPanel.height = "300px";
    controlPanel.isVertical = true;
    controlPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    controlPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    cntrlPnlTexture.addControl(controlPanel);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    playBtn = BABYLON.GUI.Button.CreateSimpleButton("playBtn", "Play");
    playBtn.width = "150px";
    playBtn.height = "40px";
    playBtn.cornerRadius = 5;
    playBtn.color = "white";
    playBtn.background = "Maroon";
    playBtn.paddingLeft = 5;
    playBtn.onPointerUpObservable.add(function() {
    	var makeGIF = makeGIFCheck.isChecked;
    	if (makeGIF) cntrlPnlTexture.dispose();
        launch(makeGIF);
    });
    controlPanel.addControl(playBtn);
    
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    var makeGIFCheck = new BABYLON.GUI.Checkbox();
    makeGIFCheck.width = "20px";
    makeGIFCheck.height = "20px";
    makeGIFCheck.isChecked = false;
    makeGIFCheck.color = "red";

    var panelForCheckbox = BABYLON.GUI.Control.AddHeader(makeGIFCheck, "Make GIF", "180px", { isHorizontal: true, controlFirst: true});
    panelForCheckbox.color = "black";
    panelForCheckbox.height = "20px";
    panelForCheckbox.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;        
    controlPanel.addControl(panelForCheckbox);
}

function launch(makeGIF) {
	    if (makeGIF) {
	    	gifMaker = new QI.GifMaker("extraction.gif", engine, 25);
	    }

        nate.assignPoseImmediately("extraction-1");
        camera.alpha = Math.PI;
	    
        var delay = 500;
        var camDelay = delay;
        nate.queuePose("extraction-2", 200, null, null, {millisBefore: delay}); camDelay += 175;
        nate.queuePose("extraction-3", 150); camDelay += 150;
        nate.queuePose("extraction-4", 150); camDelay += 150;
        nate.queuePose("extraction-5", 150); camDelay += 150;
        nate.queuePose("extraction-6", 175); camDelay += 175;
        nate.queuePose("extraction-7", 230); camDelay += 230;
        nate.queuePose("extraction-8", 150);
//        nate.queuePose("extraction-9", 800, null, null, {millisBefore: 1000});        
//        nate.queuePose("extraction-8", 800);
 //       var doNot = nate.queuePose("do-not", 400);
 //       nate.queuePose("go-in-there", 200);
        if (makeGIF) nate.queueFunction(function() { gifMaker.finish(); }, QI.PoseProcessor.INTERPOLATOR_GROUP_NAME);
       
        doCameraAnimation(camDelay);
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

function doCameraAnimation(delay) {
    var cameraQueue = new QI.PovProcessor(camera); 
    var event = new QI.PropertyEvent(camera, "alpha", Math.PI * 1.4, 2000, { millisBefore: delay } );
    cameraQueue.queueSingleEvent(event);
}

// this is an XDK event; when not using XDK, place in <body onload="onAppReady()">
document.addEventListener("app.Ready", onAppReady, false) ;