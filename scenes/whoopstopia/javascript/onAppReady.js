//this is an XDK event; when not using XDK, place in <body onload="onAppReady()">
document.addEventListener("app.Ready", onAppReady, false) ;

var engine;
var scene;
var materialsRootDir = "./images";
//full path so can run on chrome uring dev
var audioDir = "https://palmer-jc.github.io/scenes/whoopstopia/audio";

var skyboxMaterial;
var sunEvent;

var storyLines = [];
var storyTime;
var storyTimeEvent;

var sceneCamera;
var cameraQueue;
var cameraMillis = 9000;
var doorMillis = 2900;

var hero;
var heroInitialRotation = BABYLON.Vector3.Zero();
var towardsFire = new BABYLON.Vector3(0, -0.35, 0);
var awayFire    = new BABYLON.Vector3(0, 2.76, 0);
var heroCam;
var useHeroCam = false;

var sign;
var signUp =  12;
var neon;
var currently = false;
var neonEvent;
var neonTime = 1000000;
var neonInterval = 750;

var scenesDialog;
var otherScenesQueue;
var playMenu; // expose so can trigger a pause through the button

// sounds
var crashSnd;
var cymbalSnd;
var doorSnd;// http://users.wpi.edu/~theatre/res/resources/Sound/ ; 31k, mono, 8-bit, 11025 Hz, 2.9 seconds
var drum1Snd;
var drum2Snd;
var morningSnd;
var swingSnd;
var ughSnd;
var yesSnd;

// original positions / states for replay
var originalCamPos;
var originalCamRot;
var sunPosition;
var lDoorPos;
var rDoorPos;
var tDoorPos;

function onAppReady() {
    if( navigator.splashscreen && navigator.splashscreen.hide) {   // Cordova API detected
        navigator.splashscreen.hide();
    }
    
    if (BABYLON.Engine.isSupported()) {
	    var canvas = document.getElementById("renderCanvas");
	    canvas.screencanvas = true; // for CocoonJS
	    engine = new BABYLON.Engine(canvas, true, { stencil: true });	
	    scene = new BABYLON.Scene(engine);
	    
	    // explicitly start QI extension, so can actively pause it (done in button)
	    QI.TimelineControl.initialize(scene);
	        
	    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   	 	    
	    // add mountain scene with sky box
	    landscape.initScene(scene, materialsRootDir);
	    sceneCamera = scene.getCameraByName("sceneCamera");
	    originalCamPos = sceneCamera.position.clone();
	    originalCamRot = sceneCamera.rotation.clone();
	    
	    lDoorPos = scene.getMeshByName("doorLeft" ).position.clone();
	    rDoorPos = scene.getMeshByName("doorRight").position.clone();
	    tDoorPos = scene.getMeshByName("doorTop"  ).position.clone();
	    
	    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   	 	    
		// Sky material & mesh
		skyboxMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
	    skyboxMaterial.backFaceCulling = false;
		skyboxMaterial._cachedDefines.FOG = true;

		skyboxMaterial.sunPosition.y = -1;
		skyboxMaterial.sunPosition.x = -100;		
		skyboxMaterial.sunPosition.z = -20;		
		skyboxMaterial.useSunPosition = true;
		sunPosition = skyboxMaterial.sunPosition.clone();
		
		var skybox = scene.getMeshByName("skyBox");
		skybox.material = skyboxMaterial;
    	sunEvent = new QI.PropertyEvent(skyboxMaterial, "sunPosition", new BABYLON.Vector3(-50, 50, 0), cameraMillis);
		
	    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   	 
		// fire material & plane		
		var fire = new BABYLON.FireMaterial("fire", scene);
		fire.diffuseTexture    = new BABYLON.Texture(materialsRootDir + "/fireDiffuseTex.jpeg"   , scene);
		fire.distortionTexture = new BABYLON.Texture(materialsRootDir + "/fireDistortionTex.jpeg", scene);
		fire.opacityTexture    = new BABYLON.Texture(materialsRootDir + "/fireOpacityTex.jpeg"   , scene);
		fire.speed = 3.0;
		
		var fireWood = scene.getMeshByName("fireWood");
		var firePlane = BABYLON.Mesh.CreatePlane("fireplane", 1.5, scene);
		firePlane.position = new BABYLON.Vector3(fireWood.position.x, 2.5, fireWood.position.z);
		firePlane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;
		firePlane.scaling.x = 1.5;
		firePlane.scaling.y = 4;
		firePlane.material = fire;
		
	    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   	 
		// smoke
		var smokeParticles = new BABYLON.ParticleSystem("particles", 1000, scene);
		smokeParticles.particleTexture = new BABYLON.Texture(materialsRootDir + "/smoke.png", scene);
		smokeParticles.emitter = firePlane;
	    smokeParticles.minEmitBox = new BABYLON.Vector3(-0.25, 1, -0.25); // Starting all from
	    smokeParticles.maxEmitBox = new BABYLON.Vector3(0.25, 1, 0.25); // To...
		
		smokeParticles.color1 = new BABYLON.Color4(0.1, 0.1, 0.1, 0.5);
	    smokeParticles.color2 = new BABYLON.Color4(0.9, 0.9, 0.9, 0.5);
	    smokeParticles.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);
		
		smokeParticles.minSize = 3;
	    smokeParticles.maxSize = 6;
		
	    smokeParticles.minLifeTime = 3;
	    smokeParticles.maxLifeTime = 6;

	    smokeParticles.emitRate = 50;

	    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
	    smokeParticles.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;

	    smokeParticles.gravity = new BABYLON.Vector3(0, 0, 0);

	    smokeParticles.direction1 = new BABYLON.Vector3(-1.5, 8, -1.5);
	    smokeParticles.direction2 = new BABYLON.Vector3(1.5, 8, 1.5);

	    smokeParticles.minEmitPower = 0.5;
	    smokeParticles.maxEmitPower = 1.5;
	    smokeParticles.updateSpeed = 0.005;

	    smokeParticles.start();
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   	 
        // create other scenes dialog before starting to avoid pause, then hide
		// intializes Dialog Extension
    	scenesDialog = loadOtherScenes(scene);
    	scenesDialog.disolve(0, null);
    	scenesDialog.unfreezeWorldMatrixTree(); // layout freezes
    	otherScenesQueue = new QI.PovProcessor(scenesDialog);  
    	
	    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   	 
    	createControlPanel();
    	
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   	 
    	// instance Welcome sign
    	sign = new whoopsSign.sign("sign", scene, materialsRootDir);
    	sign.setEnabled(false);
    	neon = new BABYLON.HighlightLayer("neon", scene);        
        neonEvent = new QI.RecurringCallbackEvent(neonCallback, neonTime);
        
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   	 
    	// create all the backstory lines
    	storyLines.push([new DIALOG.Label("After causing the icing nozzles to clog at Mel's Donuts,"), cameraMillis / 2]);
    	storyLines.push([new DIALOG.Label("Our hero, has been laying low at his mountain retreat."  ), cameraMillis / 2]);
    	storyLines.push([new DIALOG.Label("Time for morning excerises."                             ), doorMillis]);
    	storyTime = 0;
    	for (var i = 0, len = storyLines.length; i < len; i++){
    		var label = storyLines[i][0];
    		label.layout();
    		label.unfreezeWorldMatrixTree(); // layout freezes
    		label.disolve(0, null);
    		label.layerMask = 0; // use the cameras light rather than dialog_system's
    		
    		storyTime += storyLines[i][1];
    	}
    	storyTimeEvent = new QI.RecurringCallbackEvent(backStoryCallback, storyTime);
    	
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   	     	
    	// create camera queue for camera movement & POV calc of backstory labels
    	cameraQueue = new QI.PovProcessor(sceneCamera);  
    	
        var light = new BABYLON.PointLight("cam-light", new BABYLON.Vector3(0, 0, 0), scene);
        light.intensity = 0.8;  
        scene.beforeCameraRender = function () {
        	// move the light to match where the camera is ( could be either sceneCamera or heroCam )
            light.position = scene.activeCameras[0].position;
            light.rotation = scene.activeCameras[0].rotation;
            
            // position each backstory label to be in a constant spot in front of the scene camera
            // do it this way, as opposed to 2nd camera, so can be VR friendly
            var labelDistance = 25;
            var labelDownFromCenter =  -5;
            var labelPos = sceneCamera.position.add(cameraQueue.calcMovePOV(0, labelDownFromCenter, labelDistance));
        	for (var i = 0, len = storyLines.length; i < len; i++){
        		var label = storyLines[i][0];
        		label.rotation = sceneCamera.rotation;
        		label.position = labelPos;
        	}
        };
        
	    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   	 	
	    // hero (exported disabled) & heroCam prep
        hero = new gus.Gus("Our Hero", scene, materialsRootDir); 
	    heroCam = new BABYLON.ArcRotateCamera("heroCam", -0.30, 1.43, 20, hero, scene);
	    heroCam.wheelPrecision = 25;
	    heroCam.upperBetaLimit = Math.PI / 2; // no going below ground level
	    toSceneCamera();
	    
	    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  
	    // load sounds
	    crashSnd   = new BABYLON.Sound("crash"  , audioDir + "/crash.mp3", scene);
	    cymbalSnd  = new BABYLON.Sound("cymbal" , audioDir + "/cymbal.mp3", scene);
	    doorSnd    = new BABYLON.Sound("tomb"   , audioDir + "/tomb.mp3", scene);
	    drum1Snd   = new BABYLON.Sound("drum1"  , audioDir + "/drum1.mp3", scene);
	    drum2Snd   = new BABYLON.Sound("drum2"  , audioDir + "/drum2.mp3", scene);
	    morningSnd = new BABYLON.Sound("morning", audioDir + "/morning.mp3", scene);
	    swingSnd   = new BABYLON.Sound("swing"  , audioDir + "/swing.mp3", scene);
	    ughSnd     = new BABYLON.Sound("ugh"    , audioDir + "/ugh.mp3", scene);
	    yesSnd     = new BABYLON.Sound("cymbal" , audioDir + "/yes!.mp3", scene);
	    
	    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   	 	
		// make all non-dialog meshes unpickable
		var allMeshes = scene.meshes;
		for (var i = 0, len = allMeshes.length; i < len; i++){
			if (!(allMeshes[i] instanceof DIALOG.BasePanel)){//.layerMask !== DIALOG.DialogSys.ACTIVE_DIALOG_LAYER){
				allMeshes[i].isPickable = false;
		    }
		}

        scene.executeWhenReady(sceneReady);
	    
    }else{
        alert("WebGL not supported in this browser.");
    }

    //Resize
    window.addEventListener("resize", function () {
        engine.resize();
    })
}

// assumes Dialog Extension has already been intialized
function createControlPanel() {
    var topLevel = new DIALOG.Panel("control panel", DIALOG.Panel.LAYOUT_HORIZONTAL, true);
    topLevel.horizontalAlignment = DIALOG.Panel.ALIGN_HCENTER;
    topLevel.verticalAlignment   = DIALOG.Panel.ALIGN_BOTTOM;
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   	 
    playMenu = new DIALOG.Menu(null, ["Play", "Pause"], DIALOG.Panel.LAYOUT_HORIZONTAL);
    playMenu.verticalAlignment   = DIALOG.Panel.ALIGN_VCENTER;
    playMenu.assignMenuCallback(0, function(){QI.TimelineControl.resumeSystem();} );
    playMenu.assignMenuCallback(1, function(){QI.TimelineControl.pauseSystem();} );
    playMenu.selectedIndex = 1;
    topLevel.addSubPanel(playMenu);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   	 
    var speedMenu = new DIALOG.Menu(null, ["0.1 x", "0.5 x", "1 x", "5 x", "10 x"], DIALOG.Panel.LAYOUT_HORIZONTAL);
    speedMenu.verticalAlignment   = DIALOG.Panel.ALIGN_VCENTER;
    speedMenu.assignMenuCallback(0, function(){QI.TimelineControl.Speed =  0.1;} );
    speedMenu.assignMenuCallback(1, function(){QI.TimelineControl.Speed =  0.5;} );
    
    speedMenu.assignMenuCallback(2, function(){QI.TimelineControl.Speed =  1.0;} );
    
    speedMenu.assignMenuCallback(3, function(){QI.TimelineControl.Speed =  5.0;} );
    speedMenu.assignMenuCallback(4, function(){QI.TimelineControl.Speed = 10.0;} );
    speedMenu.selectedIndex = 2;
    topLevel.addSubPanel(speedMenu);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   	 
    var restartBtn = new DIALOG.Button("Restart");
    restartBtn.verticalAlignment = DIALOG.Panel.ALIGN_VCENTER;
    restartBtn.assignCallback(function(){ 
    	restartScene();
    });
    topLevel.addSubPanel(restartBtn);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   
    var checkPanel = new DIALOG.Panel("check panel", DIALOG.Panel.LAYOUT_VERTICAL);
    var debugChk = new DIALOG.CheckBox("Debug Mode");
    debugChk.setFontSize(.5);
    debugChk.assignCallback(function(){ 
    	if (debugChk.isSelected())
            DIALOG.DialogSys._scene.debugLayer.show();
    	else
            DIALOG.DialogSys._scene.debugLayer.hide();
    });
    checkPanel.addSubPanel(debugChk);
    
    var hcCheck = new DIALOG.CheckBox("Hero Cam");
    hcCheck.setFontSize(.5);
    hcCheck.assignCallback(function(){ 
	  	if (hcCheck.isSelected()){
	  		useHeroCam = true;
	  		if (hero.isVisible) toHeroCamera();
	    } else {
	  		useHeroCam = false;
	  		toSceneCamera();
	    }
    });
    checkPanel.addSubPanel(hcCheck);
    
    topLevel.addSubPanel(checkPanel);

    topLevel.maxViewportWidth = 0.40;
    topLevel.maxViewportHeight = 0.5;
    DIALOG.DialogSys.pushPanel(topLevel);
    DIALOG.DialogSys._adjustCameraForPanel();
}

function sceneReady() {
    engine.runRenderLoop(function () {
        scene.render();
    });	
    
    cameraAnimationQueueing();
}

function cameraAnimationQueueing() {
	var inBetweenDelay = 200;
	
    cameraQueue.queueEventSeries(new QI.EventSeries([
        // start other events in an async manner, un-related to the camera's queue, after initial pause
        function(){
        	sunEvent      .initialize(0, scene);
        	storyTimeEvent.initialize(0, scene);
        },
        new QI.MotionEvent(cameraMillis * 0.9, new BABYLON.Vector3(-220, 0, 130), new BABYLON.Vector3(0, Math.PI * 0.50, 0), { pace : new QI.SinePace(QI.Pace.MODE_IN)}), // camera move around mountain
        new QI.MotionEvent(cameraMillis * 0.1, new BABYLON.Vector3(-20 , 0, -10), new BABYLON.Vector3(0, Math.PI * 0.40, 0), { millisBefore : inBetweenDelay }), // turn and face door
        doorQueuing,
        new QI.MotionEvent(doorMillis, new BABYLON.Vector3(-10, -12, 45)), // left, lower & zoom in 45
    ]));	
} 

function backStoryCallback(ratioComplete) {
	var asMillis = storyTime * ratioComplete;
	var cummTime = 0;
	var activeFound = false;
	for (var i = 0, len = storyLines.length; i < len; i++) {
		var label = storyLines[i][0];
		cummTime += storyLines[i][1];
		if (cummTime > asMillis && !activeFound){
			label.reAppear();
			activeFound = true;
			
			// start the morning sound with the 2nd line
			if (i == 1 && !morningSnd.isPlaying) {
				morningSnd.setPlaybackRate(QI.TimelineControl.Speed);
				morningSnd.play();
			}
		} else label.disolve(0, null);
	}
}

function doorQueuing() {
	var doorLeft  = scene.getMeshByName("doorLeft");
	var doorRight = scene.getMeshByName("doorRight");
	var doorTop   = scene.getMeshByName("doorTop");
	
	var moveLeft  = new QI.MotionEvent(doorMillis, new BABYLON.Vector3( 4.4, 0   , 0), null, {sound: doorSnd}); 
	var moveRight = new QI.MotionEvent(doorMillis, new BABYLON.Vector3(-3.8, 0   , 0));
	var moveTop   = new QI.MotionEvent(doorMillis, new BABYLON.Vector3(   0, 1.75, 0));
	
	doorLeft .queueSingleEvent(moveLeft );
	doorRight.queueSingleEvent(moveRight);
	
	var topGus = new QI.EventSeries([moveTop, doGus]);
	doorTop.queueEventSeries(topGus);
}

function doGus() {
	// position, enable & change to rest pose
	var interior = scene.getMeshByName("interior");
	hero.position = interior.position.clone();
	hero.rotation = heroInitialRotation.clone();
	hero.setEnabled(true);  // only does something first run
	hero.skeleton.returnToRest();
	
	hero.grandEntrance();
//	sceneCamera.lockedTarget = hero;
	
	var wrkPos = hero.position.clone();
	var wrkRot = hero.rotation.clone();
	events = [];
	// switch cam; change to pause using dialog button, so it reflects correctly
	if (useHeroCam){
		events.push(function() {toHeroCamera(); playMenu.selectedIndex = 1;});
	}
	
	// start camera pan through function on its own queue; sync swing start with last event here
	var lastEvent = new QI.Stall(1, QI.PoseProcessor.INTERPOLATOR_GROUP_NAME);
	events.push(function() {cameraPanRight(lastEvent);} );
	
	// get slightly above ground, & twist toward fire
	wrkPos = wrkPos.addInPlace(moveToFire(0, 0.2, 0));
	wrkRot = towardsFire.clone();
	events.push(new QI.PoseEvent("OnToes", 150, wrkPos.clone(), wrkRot.clone(), {absoluteMovement : true, absoluteRotation : true}));
			
	events.push(new QI.PoseEvent("StepLeft-A", 200));
	events.push(new QI.PoseEvent("StepLeft-B", 200));
	
	wrkPos = wrkPos.addInPlace(moveToFire(0, 0, 2.5));
	events.push(new QI.PoseEvent("RunRight"    , 200, wrkPos.clone(), null, {absoluteMovement : true}));
	
	wrkPos = wrkPos.addInPlace(moveToFire(0, 0, 2.5));
	events.push(new QI.PoseEvent("RunLeft"     , 200, wrkPos.clone(), null, {absoluteMovement : true}));
	
	wrkPos = wrkPos.addInPlace(moveToFire(0, 0, 2.5));
	events.push(new QI.PoseEvent("PreHandStand", 200, wrkPos.clone(), null, {absoluteMovement : true}));
	
	wrkPos = wrkPos.addInPlace(moveToFire(0, 0, .5));
	events.push(new QI.PoseEvent("HandStand-A" ,  75, wrkPos.clone(), null, {absoluteMovement : true}));
	
	wrkPos = wrkPos.addInPlace(moveToFire(0, 0, .1));
	events.push(new QI.PoseEvent("HandStand-B" ,  75, wrkPos.clone(), null, {absoluteMovement : true}));
	
	wrkPos = wrkPos.addInPlace(moveToFire(0, 0, .5));
	wrkRot.y += .7;
	events.push(new QI.PoseEvent("HandStand-C" , 150, wrkPos.clone(), wrkRot.clone(), {absoluteMovement : true, absoluteRotation : true}));
	
	wrkPos = wrkPos.addInPlace(moveToFire(0, 0, 2));
	wrkRot.y += .25; wrkRot.z -= .15;
	events.push(new QI.PoseEvent("HandStand-D" , 150, wrkPos.clone(), wrkRot.clone(), {absoluteMovement : true, absoluteRotation : true}));
			
	wrkPos = wrkPos.addInPlace(moveToFire(0, 0, .5));
	wrkRot.y += .25; wrkRot.z -= .15;
	var pov = new QI.MotionEvent(150, wrkPos.clone(), wrkRot.clone(), {absoluteMovement : true, absoluteRotation : true});
	pov._groupName = QI.PoseProcessor.INTERPOLATOR_GROUP_NAME;
	events.push(pov);
	
	wrkPos = wrkPos.addInPlace(moveToFire(0, 0, 3));
	wrkRot = awayFire.clone();
	events.push(new QI.PoseEvent("ArchedOver" , 150, wrkPos.clone(), wrkRot, {absoluteMovement : true, absoluteRotation : true}));
	
	wrkPos = wrkPos.addInPlace(moveToFire(0, 0, 2));
	wrkRot = awayFire.clone();
	events.push(new QI.PoseEvent("HandsUpArched" , 150, wrkPos.clone(), wrkRot.clone(), {absoluteMovement : true, absoluteRotation : true}));
	
	wrkRot.x += .5;
	pov = new QI.MotionEvent(150, null , wrkRot.clone(), {absoluteMovement : true, absoluteRotation : true, sound: drum1Snd});
	pov._groupName = QI.PoseProcessor.INTERPOLATOR_GROUP_NAME;
	events.push(pov);
	
	wrkPos = wrkPos.addInPlace(moveToFire(0, 4, 6));
	wrkRot.x += 2;
	pov = new QI.MotionEvent(150, wrkPos.clone() , wrkRot.clone(), {absoluteMovement : true, absoluteRotation : true});
	pov._groupName = QI.PoseProcessor.INTERPOLATOR_GROUP_NAME;
	events.push(pov);
	
	wrkPos = wrkPos.addInPlace(moveToFire(0, 0, 5));
	wrkRot.x += 1;
	pov = new QI.MotionEvent(150, wrkPos.clone() , wrkRot.clone(), {absoluteMovement : true, absoluteRotation : true});
	pov._groupName = QI.PoseProcessor.INTERPOLATOR_GROUP_NAME;
	events.push(pov);
	
	wrkPos = wrkPos.addInPlace(moveToFire(0, -4, 2));
	wrkRot.x += 2.5;
	pov = new QI.MotionEvent(150, wrkPos.clone() , wrkRot.clone(), {absoluteMovement : true, absoluteRotation : true, sound : drum2Snd});
	pov._groupName = QI.PoseProcessor.INTERPOLATOR_GROUP_NAME;
	events.push(pov);

	wrkPos = wrkPos.addInPlace(moveToFire(0, 2, 2));
	wrkRot.y -= 1;
	pov = new QI.MotionEvent(150, wrkPos.clone() , wrkRot.clone(), {absoluteMovement : true, absoluteRotation : true});
	pov._groupName = QI.PoseProcessor.INTERPOLATOR_GROUP_NAME;
	events.push(pov);

	wrkPos = wrkPos.addInPlace(moveToFire(0, 3, 2));
	wrkRot.y -= 1;
	events.push(new QI.PoseEvent("Tuck" , 150, wrkPos.clone() , wrkRot.clone(), {absoluteMovement : true, absoluteRotation : true}));
	
	wrkPos = wrkPos.addInPlace(moveToFire(0, 2, 2));
	wrkRot.y -= 1;
	wrkRot.x -= 1;
	pov = new QI.MotionEvent(150, wrkPos.clone() , wrkRot.clone(), {absoluteMovement : true, absoluteRotation : true});
	pov._groupName = QI.PoseProcessor.INTERPOLATOR_GROUP_NAME;
	events.push(pov);
	
	wrkPos = wrkPos.addInPlace(moveToFire(0, 2, 2));
	wrkRot.y -= 1;
	wrkRot.x -= 1;
	pov = new QI.MotionEvent(150, wrkPos.clone() , wrkRot.clone(), {absoluteMovement : true, absoluteRotation : true});
	pov._groupName = QI.PoseProcessor.INTERPOLATOR_GROUP_NAME;
	events.push(pov);
	
	wrkPos = wrkPos.addInPlace(moveToFire(0, 0, 2));
	wrkRot.y -= 1;
	pov = new QI.MotionEvent(150, wrkPos.clone() , wrkRot.clone(), {absoluteMovement : true, absoluteRotation : true});
	pov._groupName = QI.PoseProcessor.INTERPOLATOR_GROUP_NAME;
	events.push(pov);
	
	wrkPos = wrkPos.addInPlace(moveToFire(0, -3, 2));
	wrkRot.y -= 1;
	wrkRot.x += 1;
	events.push(new QI.PoseEvent("HandsUpArched" , 150, wrkPos.clone() , wrkRot.clone(), {absoluteMovement : true, absoluteRotation : true}));

	wrkPos = wrkPos.addInPlace(moveToFire(0, -3, 2));
	wrkRot.x += 1;
	pov = new QI.MotionEvent(150, wrkPos.clone() , wrkRot.clone(), {absoluteMovement : true, absoluteRotation : true});
	pov._groupName = QI.PoseProcessor.INTERPOLATOR_GROUP_NAME;
	events.push(pov);

	wrkPos = wrkPos.addInPlace(moveToFire(0, -3.2, 2));
	pov = new QI.MotionEvent(150, wrkPos.clone() , wrkRot.clone(), {absoluteMovement : true, absoluteRotation : true, sound: cymbalSnd});
	pov._groupName = QI.PoseProcessor.INTERPOLATOR_GROUP_NAME;
	events.push(pov);
	
	events.push(new QI.PoseEvent("HandsUp" , 500, null, null, {millisBefore : 500}));
	events.push(new QI.PoseEvent("Yes!" , 100, null, null, {millisBefore : 500, sound: yesSnd}));
//	events.push(function (){ signSwing(); });
	events.push(lastEvent);
	
    hero.queueEventSeries(new QI.EventSeries(events, 1, 1, QI.PoseProcessor.INTERPOLATOR_GROUP_NAME)); // run functions on INTERPOLATOR_GROUP_NAME
}

// mini calcMovePOV, not requiring a mesh
function moveToFire(amountRight, amountUp, amountForward) {
	var rotMarix = new BABYLON.Matrix();
    BABYLON.Matrix.RotationYawPitchRollToRef(towardsFire.y, towardsFire.x, towardsFire.z, rotMarix);

    var translationDelta = BABYLON.Vector3.Zero();
    BABYLON.Vector3.TransformCoordinatesFromFloatsToRef(amountRight * -1, amountUp, amountForward * -1, rotMarix, translationDelta);
    return translationDelta;	
}

function cameraPanRight(lastHeroEvent) {
	var syncEvent = new QI.Stall(1);
	syncEvent.setSyncPartner(lastHeroEvent);
	
    cameraQueue.queueEventSeries(new QI.EventSeries([
        new QI.MotionEvent(6500, null, new BABYLON.Vector3(0, Math.PI * 0.50, 0)),
        syncEvent,
        function() {signSwing();}
    ]));		
}

function signSwing() {
	// unplug hero from sceneCamera, first
//	undoLockedTarget();
	
    var signDistance = 20;
    var rotAmt = 0.8;
    var followthru = 0.2;
    var offsetY = 0.9;
    sign.position = sceneCamera.position.add(cameraQueue.calcMovePOV(0, signUp, signDistance));
    sign.rotation = sceneCamera.rotation.clone();
	sign.rotation.z = sign.rotation.z - rotAmt;
	sign.rotation.y = sign.rotation.y - offsetY;  // make sign slightly offset from camera for hero hit
	
	var dnTime = 250;
	var swingSeries = new QI.EventSeries([
		function() { roadKill(dnTime);},
		new QI.MotionEvent(dnTime, null, new BABYLON.Vector3(0, 0, rotAmt + followthru), {sound : swingSnd}),
		new QI.MotionEvent(200   , null, new BABYLON.Vector3(0, 0, - followthru)),
		new QI.MotionEvent(700   , null, new BABYLON.Vector3(0, offsetY - 0.3, 0))
	]);
	sign.queueEventSeries(swingSeries);
	sign.isVisible = true;
	sign.setEnabled(true);
	
	neonEvent.initialize(0, scene);
}

function neonCallback(ratioComplete) {
	var asMillis = neonTime * ratioComplete;
	var nthCycle = asMillis / neonInterval;
//	var currently = neon.shouldRender();
	
	var changeTo = (nthCycle % 2) > 1;
	
	if (currently !== changeTo){
		if (changeTo) {
			neon.addMesh(sign.It, BABYLON.Color3.Red());
			sign.Pupil.scaling.x = 1.3;
			sign.Pupil.scaling.y = 1.3;
			sign.Teeth.setEnabled(true);
		}
		else          {
			neon.removeMesh(sign.It);
			sign.Pupil.scaling.x = 1.0;
			sign.Pupil.scaling.y = 1.0;
			sign.Teeth.setEnabled(false);
		}
		currently = changeTo; // nuke when highlight working
	}
}

function roadKill(swingTime) {
	var wrkPos = hero.position.clone();
	var wrkRot = hero.rotation.clone();
	events = [];
	// get slightly above ground, & twist toward fire
	wrkPos = wrkPos.addInPlace(moveToFire(0, 7, 10));
	events.push(new QI.PoseEvent("Whoops", 500, wrkPos.clone(), null, {absoluteMovement : true, millisBefore : swingTime * .8, sound : ughSnd}));
	
	wrkPos = wrkPos.addInPlace(moveToFire(0, -6.3, 10));
	wrkRot.x += 1.85;
	var pov = new QI.MotionEvent(500, wrkPos.clone(), wrkRot.clone(), {absoluteMovement : true, absoluteRotation : true});
	pov._groupName = QI.PoseProcessor.INTERPOLATOR_GROUP_NAME;
	events.push(pov);
	
	wrkPos = wrkPos.addInPlace(moveToFire(0, 0, 4));
	events.push(new QI.PoseEvent("basis", 500, wrkPos.clone(), wrkRot.clone(), {absoluteMovement : true, absoluteRotation : true}));
	
	wrkPos = wrkPos.addInPlace(moveToFire(0, -.5, 2));
	pov = new QI.MotionEvent(150, wrkPos.clone() , null, {absoluteMovement : true});
	pov._groupName = QI.PoseProcessor.INTERPOLATOR_GROUP_NAME;
	events.push(pov);
	
	events.push(function() {bringDialog();});

    hero.queueEventSeries(new QI.EventSeries(events, 1, 1, QI.PoseProcessor.INTERPOLATOR_GROUP_NAME)); // run functions on INTERPOLATOR_GROUP_NAME
}

function bringDialog() {
	scenesDialog.scaling.x = 0.5;
	scenesDialog.scaling.y = 0.5;
	
	scenesDialog.position = sceneCamera.position.add(cameraQueue.calcMovePOV(30, 25, 110));
	scenesDialog.rotation = sceneCamera.rotation.clone();
	scenesDialog.rotation.y += 1;

	scenesDialog.reAppear();
	
	// calculate absolute positions
	var atSign = sign.position.clone();
	atSign.y -= 10;  // reduce the amount sign was moved up to swing
	
	var finalDialogPos = sceneCamera.position.add(cameraQueue.calcMovePOV(0, 2, 15));
	var finalDialogPosEvent = new QI.MotionEvent(700, finalDialogPos, sceneCamera.rotation.clone(), {absoluteMovement : true, absoluteRotation : true});
	
    var finalSignPos = sceneCamera.position.add(cameraQueue.calcMovePOV(0, signUp, -1)); // behind the camera
	var finalSignPosEvent = new QI.MotionEvent(700, finalSignPos, null, {absoluteMovement : true});
	finalSignPosEvent.setSyncPartner(finalDialogPosEvent);
    
	var smashSeries = new QI.EventSeries([
		new QI.MotionEvent(1500, atSign, null, {millisBefore : 2500, absoluteMovement : true, sound : crashSnd}),
		finalDialogPosEvent,
		function() {DIALOG.DialogSys.popPanel();}
	]);	
	otherScenesQueue.queueEventSeries(smashSeries);
	
	sign.queueSingleEvent(finalSignPosEvent);
}

function toSceneCamera() {
	scene.switchActiveCamera(sceneCamera, false); // do not attach
	scene.activeCameras[0] = sceneCamera;
    scene.getMeshByName("Landscape").setEnabled(true);
}

function undoLockedTarget(clean) {
	// unplug hero from sceneCamera
	sceneCamera.lockedTarget = null;

	if (clean){
		// the guts of MathLookAtLHToRef (https://github.com/BabylonJS/Babylon.js/blob/master/src/Math/babylon.math.ts#L2812)
		var _xAxis = BABYLON.Vector3.Zero();
	    var _yAxis = BABYLON.Vector3.Zero();
	    var _zAxis = BABYLON.Vector3.Zero();
	
	    // Z axis
	    hero.subtractToRef(sceneCamera.position, _zAxis);
	    _zAxis.normalize();
	
	    // X axis
	    BABYLON.Vector3.CrossToRef(sceneCamera.upVector, _zAxis, _xAxis);
	
	    if (_xAxis.lengthSquared() === 0) {
	        _xAxis.x = 1.0;
	    } else {
	        _xAxis.normalize();
	    }
	
	    // Y axis
	    BABYLON.Vector3.CrossToRef(_zAxis, _xAxis, _yAxis);
	    _yAxis.normalize();
	
	    // Eye angles
	    var ex = -BABYLON.Vector3.Dot(_xAxis, sceneCamera.position);
	    var ey = -BABYLON.Vector3.Dot(_yAxis, sceneCamera.position);
	    var ez = -BABYLON.Vector3.Dot(_zAxis, sceneCamera.position);
	
		sceneCamera.rotation = new BABYLON.Vector3(ex, ey, ez);
	}
}

function toHeroCamera() {
	scene.switchActiveCamera(heroCam, true);
	scene.activeCameras[0] = heroCam;
    scene.getMeshByName("Landscape").setEnabled(false);
}

function restartScene() {
//	undoLockedTarget();
	// set everything to original postions
	sceneCamera.position = originalCamPos.clone();
	sceneCamera.rotation = originalCamRot.clone();
	sceneCamera._getViewMatrix(); // in case paused
	skyboxMaterial.sunPosition = sunPosition.clone();
	
	var doorLeft  = scene.getMeshByName("doorLeft");
	var doorRight = scene.getMeshByName("doorRight");
	var doorTop   = scene.getMeshByName("doorTop");
	
	doorLeft .position = lDoorPos.clone();
	doorRight.position = rDoorPos.clone();
	doorTop  .position = tDoorPos.clone();

    sign.rotation.z = 0;    
    
    // clear all queues
    cameraQueue.clearQueue(true);
    if (sunEvent      ) sunEvent.clear();
    if (storyTimeEvent) storyTimeEvent.clear();
    if (neonEvent     ) neonEvent.clear();
    doorLeft .clearAllQueues(true);
    doorRight.clearAllQueues(true);
    doorTop  .clearAllQueues(true);
    hero     .clearAllQueues(true);
    sign     .clearAllQueues(true);
    
    // dispose or hide various meshes
	for (var i = 0, len = storyLines.length; i < len; i++) {
		var label = storyLines[i][0];
        label.disolve(0, null);
	}
	hero.makeVisible(false);

	sign.setEnabled(false);
	scenesDialog.disolve(0, null);
	
	toSceneCamera();
	cameraAnimationQueueing();
}