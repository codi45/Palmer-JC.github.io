// this is an XDK event; when not using XDK, place in <body onload="onAppReady()">
document.addEventListener("app.Ready", onAppReady, false) ;

var camera;
var model;
var currModelIdx = 1;

var references;

var scene;
var type;
var speed;
var pauseToggle;

function onAppReady() {
    references = document.getElementById("links");
    references.selectedIndex = -1;
    
	type = document.getElementById("entrance");
	type.selectedIndex = -1;
	
	speed = document.getElementById("timescale");
	speed.selectedIndex = 0;
	
	pauseToggle = document.getElementById("pauseToggle");
	pauseToggle.checked = false;
    
    if (BABYLON.Engine.isSupported()) {
	    var canvas = document.getElementById("renderCanvas");
	    canvas.screencanvas = true; // for CocoonJS
	    var engine = new BABYLON.Engine(canvas, true, { stencil: true });
	
	    scene = new BABYLON.Scene(engine);
	    scene.clearColor = new BABYLON.Color3(.5,.5,.5);
	    
	    var ground = BABYLON.Mesh.CreatePlane("ground", 1000, scene);
	    ground.rotation.x = Math.PI / 2
	    ground.material = new BABYLON.ShadowOnlyMaterial('mat', scene)
	    ground.receiveShadows = true
                
	    var shadowLight = new BABYLON.DirectionalLight('light', new BABYLON.Vector3(10, 20, -20), scene);
	    shadowLight.intensity = 0; // used only for shadows
        var shadowGenerator = new BABYLON.ShadowGenerator(512, shadowLight);
        shadowGenerator.useBlurExponentialShadowMap = true;
        shadowGenerator.blurScale = 2;
        shadowGenerator.setDarkness(0.2);
	    
		// assign the scene to the pre-loader
	    TOWER_OF_BABEL.Preloader.SCENE = scene;
	    TOWER_OF_BABEL.Preloader.READ_AHEAD_LOGGING = true;	// just for time diagnostics in console, not production	
	        
        camera = new QI.CylinderCamera("Camera", true, -Math.PI / 2, 125, scene);
        camera.wheelPrecision = 10;
        camera.fov = 0.265103; // 120mm focal length
        camera.attachControl(canvas);   

        var camlight = new BABYLON.PointLight("Lamp", BABYLON.Vector3.Zero(), scene);        
        scene.beforeCameraRender = function () {
            var cam = (scene.activeCameras.length > 0) ? scene.activeCameras[0] : scene.activeCamera;
            // move the light to match where the camera is
            camlight.position = cam.position;
            camlight.rotation = cam.rotation;
        };
        
        nextModel();
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

// from a TOB export with initScene
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


function nextModel() {
    var character = characterJukebox.pickCharacter(currModelIdx++);        
    character.makeReady(function() {
    	if (model) model.dispose();
    	model = character.instance("my_model", scene);
    	model.addStockExpressions();
    	model.removeExpressionComponents();
    	camera.setTargetMesh(model, true);   
    	freshenShadowRenderLists(scene);
    	
    	model.assignPoseLibrary("post_grand_entrance");
    	model.alwaysSelectAsActiveMesh  = true; // keep eye / lashes visible as zooming in
    	extraAnimation();
    	// only does something the first time
    	characterJukebox.prepRemainingCharacters();
    	
    	// sync drop-down to exported entrance
    	if      (model.entranceMethod instanceof  QI.GatherEntrance  ) type.selectedIndex = 1;
    	else if (model.entranceMethod instanceof  QI.ExpandEntrance  ) type.selectedIndex = 2;
    	else if (model.entranceMethod instanceof  QI.FireEntrance    ) type.selectedIndex = 3;
    	else if (model.entranceMethod instanceof  QI.TeleportEntrance) type.selectedIndex = 4;
    	else if (model.entranceMethod instanceof  QI.PoofEntrance    ) type.selectedIndex = 5;
    	else type.selectedIndex = 0;
    });
    if (currModelIdx >= characterJukebox.numCharacters) currModelIdx = 0;
}

// called by the entrance dropdown and again buttons
function assignEntrance() {
	// assign the entrance method on the mesh.  This by itself does nothing.
	switch (type.selectedIndex) {
	    case  0: model.entranceMethod = null; break; // Set method to null to 'Just Make Visible'
	    
	    //  assign to one of the stock entrances                Mesh  Duration(s)  Sound
	    case  1: model.entranceMethod = new QI.GatherEntrance  (model, [250]     , QI.Whoosh(scene)  , true); break;
	    case  2: model.entranceMethod = new QI.ExpandEntrance  (model, [250, 400], QI.Whoosh(scene)  , true); break;
	    case  3: model.entranceMethod = new QI.FireEntrance    (model, [400]     , QI.Whoosh(scene)  , true); break;
	    case  4: model.entranceMethod = new QI.TeleportEntrance(model ,[1500]    , QI.Teleport(scene), true); break;
	    case  5: model.entranceMethod = new QI.PoofEntrance    (model, [1500]    , QI.Whoosh(scene)  , true); break;
	}
	// reset for next time & make invisible
    model.makeVisible(false);                   // make the mesh & all its descendants invisible                   
    model.clearAllQueues(true);                 // all queue entries from a prior entrance, if any, are forcibly cleared
	model.deformImmediately("FACE", "BASIS");   // reset FACE shapekey (works even while invisible)
	model.clearAllSubPoses();                   // reset with no sub-poses (from the last run)
	
	// do a one second delay without the model
    setTimeout(reAppear, 1000);
}

function assignTimeScale() {
	switch (speed.selectedIndex){
	    case  0: QI.TimelineControl.Speed = 1.0; break;
	    case  1: QI.TimelineControl.Speed = 0.5; break;
	    case  2: QI.TimelineControl.Speed = 0.1; break;
	}
}

function togglePlayPause() {
	if (pauseToggle.checked) QI.TimelineControl.pauseSystem();
	else                     QI.TimelineControl.resumeSystem();
}

function reAppear() {
	model.grandEntrance();   // implemented in queues, returns immediately
	extraAnimation();        // also queues, so runs after entrance is complete, except for either assignPoseImmediately or deformImmediately
}

// Since this function only queues stuff or assigns immediately, it returns immediately
// broken out, so can be added on when model switched to in nextModel()
function extraAnimation() {
	// part done even if off screen
    model.assignPoseImmediately("standing");         
    model.deformImmediately("R_HAND", "HOLD");
    model.deformImmediately("L_HAND", "HOLD");
    
    // everything after this point will be blocked from happening until the grand entrance has completed
    
    model.addSubPose("headRight.sp"); // add head right sub-pose with the next pose
    model.queuePose("crouch", 500);   // crouch while head swivels right
    
    // after a 400 milli pause, add head left sub-pose & also make it a separate 200 milli event.
    // Since bone(s) same as headRight, reverting sub-pose not strictly required; last added sub-pose for each bone wins
    model.addSubPose("headLeft.sp", 200, {millisBefore: 400, revertSubposes: ["headRight.sp"]});
                                               
    // queue 'defendLeft' pose, assign to variable, so a finger shape key can be triggered on completion
    var defend = model.queuePose("defendLeft", 300);
    
    // finger pointing & extending of arm both start after defend completes
    model.queuePose("pointLeft", 250);
    var point = model.queueDeform("L_HAND", "POINT", 1, 350, null, null, {requireCompletionOf: defend});
    
    // grimmise once finger extended, and say 'You Kids!'
    model.queueDeform("FACE", "SCARED", 1, 350, null, null, {requireCompletionOf: point});
    
    // yell 'Get off of my lawn'
}

function linkup() {
	var url = references.options[references.selectedIndex].value;
	
    var link = window.document.createElement("a");
    link.href = url;
    var click = document.createEvent('MouseEvents');
    click.initEvent('click', true, false);
    link.dispatchEvent(click);
}

