//this is an XDK event; when not using XDK, place in <body onload="onAppReady()">
document.addEventListener("app.Ready", onAppReady, false) ;

var engine;
var scene;
var skyboxMaterial;
var scenesDialog;
var storyLines = [];
var storyTime;
var cameraQueue;
var rig = BABYLON.Camera.RIG_MODE_NONE;

function onAppReadyBarrel(){
	rig = BABYLON.Camera.RIG_MODE_VR;
	onAppReady();
}

function onAppReadyStereo(){
	rig = BABYLON.Camera.RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_PARALLEL;
	onAppReady();
}

function onAppReady() {
    if( navigator.splashscreen && navigator.splashscreen.hide) {   // Cordova API detected
        navigator.splashscreen.hide();
    }
    
    if (BABYLON.Engine.isSupported()) {
	    var canvas = document.getElementById("renderCanvas");
	    canvas.screencanvas = true; // for CocoonJS
	    engine = new BABYLON.Engine(canvas, true);
	
	    scene = new BABYLON.Scene(engine);
	    materialsRootDir = "./images";
	        
	    // add scene specific code
	    landscape.initScene(scene, materialsRootDir);
	    
	    // assign rig
	    scene.activeCamera.setCameraRigMode(rig, { interaxialDistance: 0.0637 });
	    
		// Sky material & mesh
		skyboxMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
	    skyboxMaterial.backFaceCulling = false;
		skyboxMaterial._cachedDefines.FOG = true;

		skyboxMaterial.sunPosition.y = 0;
		skyboxMaterial.sunPosition.x = -100;		
		skyboxMaterial.useSunPosition = true;
		
		var skybox = scene.getMeshByName("skyBox");
		skybox.material = skyboxMaterial;
		
		// fire & smoke materials
		var fire = new BABYLON.FireMaterial("fire", scene);
		fire.diffuseTexture    = new BABYLON.Texture(materialsRootDir + "/fireDiffuseTex.jpeg"   , scene);
		fire.distortionTexture = new BABYLON.Texture(materialsRootDir + "/fireDistortionTex.jpeg", scene);
		fire.opacityTexture    = new BABYLON.Texture(materialsRootDir + "/fireOpacityTex.jpeg"   , scene);
		fire.speed = 5.0;
		
		var firePlane = BABYLON.Mesh.CreatePlane("fireplane", 1.5, scene);
		firePlane.position = new BABYLON.Vector3(0, 2.2, 0);
		firePlane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;
		firePlane.scaling.x = 1.5;
		firePlane.scaling.y = 5;
		firePlane.material = fire;
	
        // create other scenes dialog before starting to avoid pause, then hide
    	scenesDialog = loadOtherScenes(scene);
    	scenesDialog.rotation = scene.activeCamera.rotation;
    	scenesDialog.position.y = 10;
    	scenesDialog.disolve(0, null);
    	
        var light = new BABYLON.PointLight("point", BABYLON.Vector3.Zero(), scene);
        light.intensity = 1;
        light.specular = new BABYLON.Color3(0,0,0); // temporary!!!!!!!!!!!!!!!!!
            
    	// create all the backstory lines
    	storyLines.push([new DIALOG.Label("After causing the icing nozzles to clog at Mel's Donuts,"), 5800]);
    	storyLines.push([new DIALOG.Label("Our hero, has been laying low at his mountain retreat."  ), 5800]);
    	storyLines.push([new DIALOG.Label("Time for morning excerises."                             ), 4000]);
    	storyTime = 0;
    	for (var i = 0, len = storyLines.length; i < len; i++){
    		var label = storyLines[i][0];
    		label.layout();
    		label.unfreezeWorldMatrixTree(); // layout freezes, need to undo
    		label.disolve(0, null);
    		
    		storyTime += storyLines[i][1];
    	}
	    
    	// create camera queue for camera movement & POV calc of backstory labels
    	cameraQueue = new QI.PovProcessor(scene.activeCamera);  
    	
        scene.beforeCameraRender = function () {
        	// move the light to match where the camera is
        	var camera = scene.activeCamera;
            light.position = camera.position;
            
            // position each backstory label to be in a constant spot in front of the camera
            // do it this way, as opposed to 2nd camera, so can be VR friendly
            var labelDistance = 25;
            var labelDownFromCenter =  -5;
            var labelPos = camera.position.add(cameraQueue.calcMovePOV(0, labelDownFromCenter, labelDistance));
        	for (var i = 0, len = storyLines.length; i < len; i++){
        		var label = storyLines[i][0];
        		label.rotation = camera.rotation;
        		label.position = labelPos;
        	}
        };
        
        scene.executeWhenReady(sceneReady);
	    
    }else{
        alert("WebGL not supported in this browser.");
    }

    //Resize
    window.addEventListener("resize", function () {
        engine.resize();
    })
}

function sceneReady() {
    engine.runRenderLoop(function () {
        scene.render();
    });	
    
    var initialPause = 1200;
    cameraAnimationQueueing(10000, initialPause);
    new QI.RecurringCallbackEvent(backStoryCallback, storyTime, initialPause).initialize(0, scene);
}

function cameraAnimationQueueing(millis, initialPause){
    cameraQueue.queueEventSeries(new QI.EventSeries([
        new QI.Stall(initialPause), // allow time for look around
        function(){new QI.PropertyEvent(skyboxMaterial, "sunPosition", new BABYLON.Vector3(-50, 50, 0), 10000).initialize(0, scene);},  // start sun rise async
        new QI.Stall(1600), // allow sun rise to be seen alone briefly
        new QI.MotionEvent(millis * 0.6,   0, new BABYLON.Vector3(-220, 0, 130), new BABYLON.Vector3(0, Math.PI * 0.50, 0), false, new QI.SinePace(QI.Pace.MODE_OUT)), // camera move around mountain
        new QI.MotionEvent(millis * 0.4, 200, new BABYLON.Vector3(-20 , 0, -10), new BABYLON.Vector3(0, Math.PI * 0.4, 0)), // turn and face door
        doorQueuing
    ]));	
} 

function backStoryCallback(ratioComplete){
	if (ratioComplete === 1){
		for (var i = 0, len = storyLines.length; i < len; i++){
			storyLines[i][0].dispose();
		}
		return;
	}
	
	var asMillis = storyTime * ratioComplete;
	var cummTime = 0;
	var activeFound = false;
	for (var i = 0, len = storyLines.length; i < len; i++){
		var label = storyLines[i][0];
		cummTime += storyLines[i][1];
		if (cummTime > asMillis && !activeFound){
			label.reAppear();
			activeFound = true;
		
		} else label.disolve(0, null);
	}
}

function doorQueuing(){
	var doorLeft  = scene.getMeshByName("doorLeft");
	var doorRight = scene.getMeshByName("doorRight");
	var doorTop   = scene.getMeshByName("doorTop");
	
	var millis = 4000;
	var delay = 0;
	var moveLeft  = new QI.MotionEvent(millis, delay, new BABYLON.Vector3( 4.4, 0, 0));
	var moveRight = new QI.MotionEvent(millis, delay, new BABYLON.Vector3(-3.8, 0, 0));
	var moveTop   = new QI.MotionEvent(millis, delay, new BABYLON.Vector3(   0, 1.75, 0));
	
	// to do: add sound onto one of door moves
	doorLeft .queueSingleEvent(moveLeft );
	doorRight.queueSingleEvent(moveRight);
	doorTop  .queueSingleEvent(moveTop  );
	
	bringDialog();

}



function bringDialog(){
	scenesDialog.reAppear();
}


