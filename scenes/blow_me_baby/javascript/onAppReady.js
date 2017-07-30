//full path so can run on chrome during dev
var commonAudioDir = "https://palmer-jc.github.io/audio";
var audioDir = "https://palmer-jc.github.io/scenes/blow_me_baby/audio";

var scene;
var camera;
var camLight;
var initialPos = new BABYLON.Vector3(8, 3, 1);
var initialRot = new BABYLON.Vector3(0, Math.PI / -2, 0);

var butterflies = new Array(94);
var bodyDim = 1.5;
var width = bodyDim * 5.5; // includes space between
var leftMost = -1 * (width * 4);
var rightMost;
var deck = 2;
var ceiling = deck + (bodyDim * 5);

var origIdx;

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
	    
        camera = new BABYLON.FreeCamera("Camera", initialPos, scene);
        camera.rotation = initialRot;

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
        
	    new butterfly.toLA("toLA", scene);
	    
	    var orig = butterflies[origIdx];
	    orig.assignPoseImmediately("flap-up");
	    orig.entranceMethod = new QI.PoofEntrance(orig, [1500], QI.Whoosh(scene));
	    orig.setEnabled(true);
	    orig.grandEntrance();
	    flap(orig, false);
	    // cause the delay of the Wind button UI till poof complete by putting in an event series
	    orig.queueEventSeries(new QI.EventSeries( [function() {addUI();}] ));
	    
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
        butterfly.freshenShadowRenderLists(scene);   
}
//======================================= Pre-loading =========================================
var windSnd;
var whatTheSnd;
var clickSnd;
function preloading() {
	windSnd    = new BABYLON.Sound("wind"    , commonAudioDir + "/wind.mp3", scene, {loop: true});
	whatTheSnd = new BABYLON.Sound("what_the", audioDir       + "/what_the.mp3", scene);
	clickSnd   = new BABYLON.Sound("click"   , commonAudioDir + "/click.mp3", scene);
	asIndividualMeshes();
	butterflies[0].compileMaterials();
}

// cannot be called in preloading if there become more methods (cloning / instances) prompted for in UI
function asIndividualMeshes() {
    // instance all the butterflies (were exported disabled)
    for(var i = 0, len = butterflies.length; i < len; i++) {
    	butterflies[i] = new butterfly.Butterfly_Body("b" + i, scene);
    	butterflies[i].rotation.x = 0.5;
    	butterflies[i].alwaysSelectAsActiveMesh = true;
    }
    
    // assign the final position of each
    var xOffset = leftMost;
    var meshOffset = 0;
    meshOffset = doS(meshOffset, xOffset, 0); xOffset += width;
    meshOffset = doI(meshOffset, xOffset, 1); xOffset += width;
    meshOffset = doG(meshOffset, xOffset, 2); xOffset += width;
    meshOffset = doG(meshOffset, xOffset, 3); xOffset += width;
    
    // the first butterfly of the letter R is our wind tunnel butterfly
    origIdx = meshOffset;
    
    meshOffset = doR(meshOffset, xOffset, 4); xOffset += width;
    meshOffset = doA(meshOffset, xOffset, 5); xOffset += width;
    meshOffset = doP(meshOffset, xOffset, 6); xOffset += width;
    meshOffset = doH(meshOffset, xOffset, 7); rightMost = xOffset + width;
    
    // assign the initial positions, random except for original
    for(var i = 0, len = butterflies.length; i < len; i++) {
    	if (i !== origIdx) {
    	butterflies[i].position.x = Math.random() * leftMost;
    	butterflies[i].position.y = Math.random() * ceiling - 1;
    	butterflies[i].position.z = Math.random() * 20 - 10;
    	} else {
			butterflies[i].position.copyFrom(butterflies[i].finalPos);
		}
    } 
}

//========================================= scene UI ==========================================
var windAdvancedTexture;
var UIMesh;
function addUI() {
	UIMesh = new BABYLON.Mesh.CreatePlane("UIMesh", 7, scene);
	UIMesh.rotation.y = Math.PI / -2;
	UIMesh.position.y = 2;
	UIMesh.position.z = -2;
	var isOn = false;
	
	windAdvancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(UIMesh);
    var windBtn = BABYLON.GUI.Button.CreateSimpleButton("windBtn", "Start Wind");
    windBtn.width = "150px"
    windBtn.height = "40px";
    windBtn.color = "white";
    windBtn.cornerRadius = 20;
    windBtn.background = "orange";
    windBtn.onPointerUpObservable.add(function() {
    	if (isOn) {
    		endHarshFlight();
    		
    	} else {
    		if (!butterflies[origIdx].isVisible) return;
    		
    		windBtn.children[0].text = "Stop Wind";
            
            isOn = true;
            beginHarshFlight();
    	}
    });
    windAdvancedTexture.addControl(windBtn);    
}

function animateUI(orig) {
	// butterfly events
    var forwardPos = orig.finalPos.subtractFromFloats(0, 0, 1.4);
    var punchForward = orig.queuePOV(200, forwardPos, null, { absoluteMovement: true });
	orig.queuePOV(200, orig.finalPos, null, { absoluteMovement: true, sound: clickSnd });
	
    // button animation events, then clean up / transformation
	var uiQueue = new QI.PovProcessor(UIMesh);  
	var events = [
		new QI.MotionEvent(1000, new BABYLON.Vector3(2, 2, -5), new BABYLON.Vector3(Math.PI, Math.PI, 0), { requireCompletionOf: punchForward, absoluteMovement: true } ),
		function() {
    		windAdvancedTexture.dispose();
    		UIMesh.dispose();
    		transform();
		}
	];
	uiQueue.queueEventSeries(new QI.EventSeries(events));
}
//====================================== Flap & Flutter =======================================
var doFlutter = true;
function flap(butterfly, harsh) {
	var milliDuration;
	if (harsh)
        milliDuration = Math.random() * (150 - 75) + 75; // between 75 & 150 millis
	else
        milliDuration = Math.random() * (400 - 300) + 300; // between 300 & 400 millis

	var events = [
            new QI.PoseEvent("flap-up", milliDuration),
	    new QI.PoseEvent("flap-down", milliDuration),
	    function() { flap(butterfly, harsh); }
	];
	butterfly.queueEventSeries(new QI.EventSeries(events, 1, 1, QI.PoseProcessor.INTERPOLATOR_GROUP_NAME));
	if (doFlutter) flutter(butterfly, milliDuration * 2, harsh);
}

//could put POV moves into flaps, but want to break up; means 2 to 4 for every flap up-down
function flutter(butterfly, totalDuration, harsh) {
	var moves = Math.floor(Math.random() * (4 - 2) + 2); // between 2 & 4 moves
	var milliDuration = totalDuration / moves;
	
	var events = [];
	var posReturnVector = BABYLON.Vector3.Zero();
	var rotReturnVector = BABYLON.Vector3.Zero();
	
	var max = harsh ? 0.2 : 0.1;
	
	// assign up to next last with small random amounts
	for (var i = 0; i + 1 < moves; i++) {
            events.push( new QI.MotionEvent(milliDuration, flutterProperty(moves, max, posReturnVector), flutterProperty(moves, max, rotReturnVector)) );
	}
	
	// assign last as the returnVector
	events.push( new QI.MotionEvent(milliDuration, posReturnVector, rotReturnVector) );
	
	butterfly.queueEventSeries(new QI.EventSeries(events));
}

//could put POV moves into flaps, but want to break up; means 2 to 4 for every flap up-down
function flutterProperty(moves, max, returnVector) {
	var max2 = max * 2;
	var x = Math.random() * max2 - max; returnVector.x -= x;
	var y = Math.random() * max2 - max; returnVector.y -= y;
	var z = Math.random() * max2 - max; returnVector.z -= z;
	return new BABYLON.Vector3(x, y, z);
}
//======================================= Harsh Flight ========================================
function beginHarshFlight(){
	windSnd.play();
	
    var orig = butterflies[origIdx];
    orig.clearAllQueues(true); 
    
    // losing Ground and rotating back to fully horizontal
    orig.queuePOV(300, new BABYLON.Vector3(0, 0, -5), new BABYLON.Vector3(0, 0, 0), {absoluteRotation: true}); 
	flap(orig, true);
}

function endHarshFlight(){
	var downTime = 500;
	windSnd.setVolume(0, downTime);

    var orig = butterflies[origIdx];
    var events = [
        new QI.MotionEvent(downTime, orig.finalPos, new BABYLON.Vector3(0.5, 0, 0), { absoluteMovement: true }),
        function() { 
            windSnd.stop(); 
            windSnd.dispose();
            flap(orig, false);
        },
        new QI.Stall(750, QI.PovProcessor.POV_GROUP_NAME, whatTheSnd), // not the whole sound, duration just for the 'whew, what'	
        function() { 
            animateUI(orig);
        }
    ];
    orig.clearAllQueues(true); 
    orig.queueEventSeries(new QI.EventSeries(events));
}
//====================================== Transformation =======================================
var visibilityTime = 5000;
var transformTime = 4000;

function transform() {
    meshes = [];
    for(var i = 0, len = butterflies.length; i < len; i++) {
    	var butterfly = butterflies[i];
    	butterfly.setEnabled(true);
    	butterfly.makeVisible(true);
    	if (i !== origIdx) meshes.push(butterfly);
    	else butterfly.clearAllQueues(true); 
    	doFlutter = false;
        flap(butterfly, false);
        butterfly.queuePOV(transformTime, butterfly.finalPos, null, { absoluteMovement: true, millisBefore: visibilityTime } );
    }
    doCameraAnimation();
//    QI.SceneTransition.perform(QI.VisiblityTransition.NAME, meshes, visiblityTime, null, {runUnPrivileged: false});
}

function doCameraAnimation() {
    var cameraQueue = new QI.PovProcessor(camera); 
	
    var events = [
        new QI.MotionEvent(transformTime, new BABYLON.Vector3(-45, 2, -30), new BABYLON.Vector3(0, Math.PI * 0.50, 0), { pace : new QI.SinePace(QI.Pace.MODE_IN),  millisBefore: visibilityTime} ), // camera move around to the front
        function() { doFlutter = true; }
    ];
    cameraQueue.queueEventSeries(new QI.EventSeries(events));
}

// ==================================== Letter Positioning ====================================
function doS(meshOffset, xOffset, group) {
	for (var i = 0; i < 10; i ++){
		var butterfly = butterflies[meshOffset + i];
		butterfly.group = group;
		var p = BABYLON.Vector3.Zero();
	
		switch (i){
			case  0: p.x = xOffset                  ; p.y = deck + (bodyDim)      ; break;
			case  1: p.x = xOffset + (bodyDim)      ; p.y = deck                  ; break;
			case  2: p.x = xOffset + (bodyDim *   2); p.y = deck                  ; break;
			case  3: p.x = xOffset + (bodyDim *   3); p.y = deck + (bodyDim)      ; break;
			case  4: p.x = xOffset + (bodyDim *   2); p.y = deck + (bodyDim *   2); break;
			case  5: p.x = xOffset + (bodyDim)      ; p.y = deck + (bodyDim *   3); break;
			case  6: p.x = xOffset                  ; p.y = deck + (bodyDim *   4); break;
			case  7: p.x = xOffset + (bodyDim)      ; p.y = deck + (bodyDim *   5); break;
			case  8: p.x = xOffset + (bodyDim *   2); p.y = deck + (bodyDim *   5); break;
			case  9: p.x = xOffset + (bodyDim *   3); p.y = deck + (bodyDim *   4); break;
		}
		butterfly.finalPos = p;
	}
	return meshOffset + 10;
}

function doI(meshOffset, xOffset, group) {
	for (var i = 0; i < 12; i ++){
		var butterfly = butterflies[meshOffset + i];
		butterfly.group = group;
		var p = BABYLON.Vector3.Zero();
	
		switch (i){
			case  0: p.x = xOffset                  ; p.y = deck                  ; break;
			case  1: p.x = xOffset + (bodyDim)      ; p.y = deck                  ; break;
			case  2: p.x = xOffset + (bodyDim *   2); p.y = deck                  ; break;
			case  3: p.x = xOffset + (bodyDim *   3); p.y = deck                  ; break;
			case  4: p.x = xOffset + (bodyDim * 1.5); p.y = deck + (bodyDim)      ; break;
			case  5: p.x = xOffset + (bodyDim * 1.5); p.y = deck + (bodyDim *   2); break;
			case  6: p.x = xOffset + (bodyDim * 1.5); p.y = deck + (bodyDim *   3); break;
			case  7: p.x = xOffset + (bodyDim * 1.5); p.y = deck + (bodyDim *   4); break;
			case  8: p.x = xOffset                  ; p.y = deck + (bodyDim *   5); break;
			case  9: p.x = xOffset + (bodyDim)      ; p.y = deck + (bodyDim *   5); break;
			case 10: p.x = xOffset + (bodyDim *   2); p.y = deck + (bodyDim *   5); break;
			case 11: p.x = xOffset + (bodyDim *   3); p.y = deck + (bodyDim *   5); break;
		}
		butterfly.finalPos = p;
	}
	return meshOffset + 12;
}

function doG(meshOffset, xOffset, group) {
	for (var i = 0; i < 11; i ++){
		var butterfly = butterflies[meshOffset + i];
		butterfly.group = group;
		var p = BABYLON.Vector3.Zero();
	
		switch (i){
			case  0: p.x = xOffset + (bodyDim *   2); p.y = deck + (bodyDim * 1.5); break;
			case  1: p.x = xOffset + (bodyDim *   3); p.y = deck + (bodyDim * 1.5)      ; break;
			case  2: p.x = xOffset + (bodyDim *   2); p.y = deck                  ; break;
			case  3: p.x = xOffset + (bodyDim)      ; p.y = deck                  ; break;
			case  4: p.x = xOffset                  ; p.y = deck + (bodyDim)      ; break;
			case  5: p.x = xOffset                  ; p.y = deck + (bodyDim *   2); break;
			case  6: p.x = xOffset                  ; p.y = deck + (bodyDim *   3); break;
			case  7: p.x = xOffset                  ; p.y = deck + (bodyDim *   4); break;
			case  8: p.x = xOffset + (bodyDim)      ; p.y = deck + (bodyDim *   5); break;
			case  9: p.x = xOffset + (bodyDim *   2); p.y = deck + (bodyDim *   5); break;
			case 10: p.x = xOffset + (bodyDim *   3); p.y = deck + (bodyDim *   4); break;
		}
		butterfly.finalPos = p;
	}
	return meshOffset + 11;
}

function doR(meshOffset, xOffset, group) {
	for (var i = 0; i < 14; i ++){
		var butterfly = butterflies[meshOffset + i];
		butterfly.group = group;
		var p = BABYLON.Vector3.Zero();
	
		switch (i){
			case  0: p.x = xOffset                  ; p.y = deck                  ; break;
			case  1: p.x = xOffset                  ; p.y = deck + (bodyDim)      ; break;
			case  2: p.x = xOffset                  ; p.y = deck + (bodyDim *   2); break;
			case  3: p.x = xOffset                  ; p.y = deck + (bodyDim *   3); break;
			case  4: p.x = xOffset                  ; p.y = deck + (bodyDim *   4); break;
			case  5: p.x = xOffset                  ; p.y = deck + (bodyDim *   5); break;
			case  6: p.x = xOffset + (bodyDim)      ; p.y = deck + (bodyDim *   5); break;
			case  7: p.x = xOffset + (bodyDim *   2); p.y = deck + (bodyDim *   5); break;
			case  8: p.x = xOffset + (bodyDim *   3); p.y = deck + (bodyDim *   4); break;
			case  9: p.x = xOffset + (bodyDim *   3); p.y = deck + (bodyDim *   3); break;
			case 10: p.x = xOffset + (bodyDim *   2); p.y = deck + (bodyDim * 2.5); break;
			case 11: p.x = xOffset + (bodyDim)      ; p.y = deck + (bodyDim * 2.4); break;
			case 12: p.x = xOffset + (bodyDim * 1.2); p.y = deck + (bodyDim * 1.2); break;
			case 13: p.x = xOffset + (bodyDim * 2.4); p.y = deck                  ; break;
		}
		butterfly.finalPos = p;
	}
	return meshOffset + 14;
}

function doA(meshOffset, xOffset, group) {
	for (var i = 0; i < 10; i ++){
		var butterfly = butterflies[meshOffset + i];
		butterfly.group = group;
		var p = BABYLON.Vector3.Zero();
	
		switch (i){
			case  0: p.x = xOffset                  ; p.y = deck                   ; break;
			case  1: p.x = xOffset + (bodyDim * 0.3); p.y = deck + (bodyDim * 1.25); break;
			case  2: p.x = xOffset + (bodyDim * 0.7); p.y = deck + (bodyDim *  2.5); break;
			case  3: p.x = xOffset + (bodyDim * 1.1); p.y = deck + (bodyDim * 3.75); break;
			case  4: p.x = xOffset + (bodyDim * 1.5); p.y = deck + (bodyDim *    5); break;
			case  5: p.x = xOffset + (bodyDim * 1.9); p.y = deck + (bodyDim * 3.75); break;
			case  6: p.x = xOffset + (bodyDim * 2.3); p.y = deck + (bodyDim *  2.5); break;
			case  7: p.x = xOffset + (bodyDim * 2.7); p.y = deck + (bodyDim * 1.25); break;
			case  8: p.x = xOffset + (bodyDim *   3); p.y = deck                   ; break;
			
			case  9: p.x = xOffset + (bodyDim * 1.5); p.y = deck + (bodyDim *  2.5); break;
		}
		butterfly.finalPos = p;
	}
	return meshOffset + 10;
}

function doP(meshOffset, xOffset, group) {
	for (var i = 0; i < 12; i ++){
		var butterfly = butterflies[meshOffset + i];
		butterfly.group = group;
		var p = BABYLON.Vector3.Zero();
	
		switch (i){
			case  0: p.x = xOffset                  ; p.y = deck                  ; break;
			case  1: p.x = xOffset                  ; p.y = deck + (bodyDim)      ; break;
			case  2: p.x = xOffset                  ; p.y = deck + (bodyDim *   2); break;
			case  3: p.x = xOffset                  ; p.y = deck + (bodyDim *   3); break;
			case  4: p.x = xOffset                  ; p.y = deck + (bodyDim *   4); break;
			case  5: p.x = xOffset                  ; p.y = deck + (bodyDim *   5); break;
			case  6: p.x = xOffset + (bodyDim)      ; p.y = deck + (bodyDim *   5); break;
			case  7: p.x = xOffset + (bodyDim *   2); p.y = deck + (bodyDim *   5); break;
			case  8: p.x = xOffset + (bodyDim *   3); p.y = deck + (bodyDim *   4); break;
			case  9: p.x = xOffset + (bodyDim *   3); p.y = deck + (bodyDim *   3); break;
			case 10: p.x = xOffset + (bodyDim *   2); p.y = deck + (bodyDim * 2.5); break;
			case 11: p.x = xOffset + (bodyDim)      ; p.y = deck + (bodyDim * 2.4); break;
		}
		butterfly.finalPos = p;
	}
	return meshOffset + 12;
}

function doH(meshOffset, xOffset, group) {
	for (var i = 0; i < 14; i ++){
		var butterfly = butterflies[meshOffset + i];
		butterfly.group = group;
		var p = BABYLON.Vector3.Zero();
		
		switch (i){
			case  0: p.x = xOffset                  ; p.y = deck                  ; break;
			case  1: p.x = xOffset                  ; p.y = deck + (bodyDim)      ; break;
			case  2: p.x = xOffset                  ; p.y = deck + (bodyDim *   2); break;
			case  3: p.x = xOffset                  ; p.y = deck + (bodyDim *   3); break;
			case  4: p.x = xOffset                  ; p.y = deck + (bodyDim *   4); break;
			case  5: p.x = xOffset                  ; p.y = deck + (bodyDim *   5); break;
			
			case  6: p.x = xOffset + (bodyDim *   3); p.y = deck + (bodyDim *   5); break;
			case  7: p.x = xOffset + (bodyDim *   3); p.y = deck + (bodyDim *   4); break;
			case  8: p.x = xOffset + (bodyDim *   3); p.y = deck + (bodyDim *   3); break;
			case  9: p.x = xOffset + (bodyDim *   3); p.y = deck + (bodyDim *   2); break;
			case 10: p.x = xOffset + (bodyDim *   3); p.y = deck + (bodyDim)      ; break;
			case 11: p.x = xOffset + (bodyDim *   3); p.y = deck                  ; break;
			
			case 12: p.x = xOffset + (bodyDim)      ; p.y = deck + (bodyDim * 2.5); break;
			case 13: p.x = xOffset + (bodyDim *   2); p.y = deck + (bodyDim * 2.5); break;
		}
		butterfly.finalPos = p;

	}
	return meshOffset + 14;
}

// this is an XDK event; when not using XDK, place in <body onload="onAppReady()">
document.addEventListener("app.Ready", onAppReady, false) ;