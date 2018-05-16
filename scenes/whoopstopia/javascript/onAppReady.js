//this is an XDK event; when not using XDK, place in <body onload="onAppReady()">
document.addEventListener("app.Ready", onAppReady, false) ;
var engine;
var scene;
var materialsRootDir = "./images";
//full path so can run on chrome during dev
var commonAudioDir = "https://palmer-jc.github.io/audio";
var audioDir = "https://palmer-jc.github.io/scenes/whoopstopia/audio";

var skyboxMaterial;
var sunEvent;

var storyLines = [];
var storyContainer;
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
var signUp =  12.5;
var neon;
var currently = false;
var neonEvent;
var neonTime = 1000000;
var neonInterval = 750;

var controlPanel;
var playPauseBtn;
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
        skyboxMaterial.FOG = true;

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
        scenesDialog = loadOtherScenes(scene, 20);
        scenesDialog.isVisible = false;
        otherScenesQueue = new QI.PovProcessor(scenesDialog);

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        createControlPanel();
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // instance Welcome sign
        sign = new whoopsSign.sign("sign", scene, materialsRootDir);
        sign.setEnabled(false);
        neon = new BABYLON.GlowLayer("glow", scene); //new BABYLON.HighlightLayer("neon", scene);
        neon.addIncludedOnlyMesh(sign.It);
        neon.customEmissiveColorSelector = function(mesh, subMesh, material, result) {
            result.set(1, 0, 0, 1);
        };
        neonEvent = new QI.RecurringCallbackEvent(neonCallback, neonTime);

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        // create all the backstory lines
        var addStoryLine = function(text, millis) {
            var lineControl = new BABYLON.GUI.TextBlock("line", text);
            lineControl.fontSize = 36;
            lineControl.color = "white";
            storyLines.push([lineControl, millis]);
        }
        addStoryLine("After causing the icing nozzles to clog at Mel's Donuts,", cameraMillis / 2);
        addStoryLine("Our hero, has been laying low at his mountain retreat."  , cameraMillis / 2);
        addStoryLine("Time for morning excerises."                             , doorMillis);
        storyTime = 0;
        storyContainer = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("storyContainer");
        // determine total story time
        for (var i = 0, len = storyLines.length; i < len; i++){
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
        crashSnd   = new BABYLON.Sound("crash"  , commonAudioDir + "/crash.mp3", scene);
        cymbalSnd  = new BABYLON.Sound("cymbal" , commonAudioDir + "/cymbal.mp3", scene);
        doorSnd    = new BABYLON.Sound("tomb"   , commonAudioDir + "/tomb.mp3", scene);
        drum1Snd   = new BABYLON.Sound("drum1"  , commonAudioDir + "/drum1.mp3", scene);
        drum2Snd   = new BABYLON.Sound("drum2"  , commonAudioDir + "/drum2.mp3", scene);
        morningSnd = new BABYLON.Sound("morning", commonAudioDir + "/morning.mp3", scene);
        swingSnd   = new BABYLON.Sound("swing"  , commonAudioDir + "/swing.mp3", scene);
        ughSnd     = new BABYLON.Sound("ugh"    , audioDir + "/ugh.mp3", scene);
        yesSnd     = new BABYLON.Sound("cymbal" , audioDir + "/yes!.mp3", scene);

        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        scene.executeWhenReady(sceneReady);

    }else{
        alert("WebGL not supported in this browser.");
    }

    //Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });
}

function playPause() {
    var running = playPauseBtn.children[0].text !== "Play";
    if (running) {
        // so pause and set text back to play
        playPauseBtn.children[0].text = "Play";
        QI.TimelineControl.pauseSystem();

    } else {
        // so play & set text to pause
        playPauseBtn.children[0].text = "Pause";
        QI.TimelineControl.resumeSystem();
    }
}

function createControlPanel() {
    var cntrlPnlTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("cntrlPnlTexture");

    var controlPanel = new BABYLON.GUI.StackPanel();
    controlPanel.width = "50%";
    controlPanel.height = "70px";
    controlPanel.alpha = 0.5;
    controlPanel.background = "Black";
    controlPanel.isVertical = false;
    controlPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    controlPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    cntrlPnlTexture.addControl(controlPanel);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    playPauseBtn = BABYLON.GUI.Button.CreateSimpleButton("playPauseBtn", "Pause");
    playPauseBtn.width = "150px";
    playPauseBtn.height = "40px";
    playPauseBtn.cornerRadius = 5;
    playPauseBtn.color = "white";
    playPauseBtn.background = "Maroon";
    playPauseBtn.paddingLeft = 5;
    playPauseBtn.onPointerUpObservable.add(function() {
    	playPause();
    });
    controlPanel.addControl(playPauseBtn);
    playPause(); // sync

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    var addRadio = function(text, value, preSelect) {
        var button = new BABYLON.GUI.RadioButton();
        button.width = "20px";
        button.height = "20px";
        button.color = "white";
        button.background = "Maroon";
        button.paddingLeft = 5;
        button._isChecked = preSelect; // using isChecked errors

        button.onIsCheckedChangedObservable.add(function(state) {
            if (state) {
            	QI.TimelineControl.Speed = value;
            }
        });

        var header = BABYLON.GUI.Control.AddHeader(button, text, "45px", { isHorizontal: true, controlFirst: true });
        header.height = "20px";
        header.color = "white";

        controlPanel.addControl(header);
    };

    addRadio("0.1 x",  0.1, false);
    addRadio("0.5 x",  0.5, false);
    addRadio("1 x"  ,  1  , true );
    addRadio("5 x"  ,  5  , false);
    addRadio("10 x" , 10  , false);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    var restartBtn =  BABYLON.GUI.Button.CreateSimpleButton("RestartBtn", "Restart");
    restartBtn.width = "150px";
    restartBtn.height = "40px";
    restartBtn.cornerRadius = 5;
    restartBtn.color = "white";
    restartBtn.background = "Maroon";
    restartBtn.paddingLeft = 5;
    restartBtn.onPointerUpObservable.add(function() {
    	restartScene();
    });
    controlPanel.addControl(restartBtn);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    var hcCheck = new BABYLON.GUI.Checkbox();
    hcCheck.width = "20px";
    hcCheck.height = "20px";
    hcCheck.isChecked = false;
    hcCheck.color = "Maroon";
    hcCheck.paddingLeft = 5;
    hcCheck.onPointerUpObservable.add(function() {
        if (hcCheck.isChecked){
            useHeroCam = true;
            if (hero.isVisible) toHeroCamera();
        } else {
            useHeroCam = false;
            toSceneCamera();
        }
    });

    var panelForCheckbox = BABYLON.GUI.Control.AddHeader(hcCheck, "Hero Cam", "100px", { isHorizontal: true, controlFirst: true});
    panelForCheckbox.color = "white";
    panelForCheckbox.height = "20px";
    panelForCheckbox.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

    controlPanel.addControl(panelForCheckbox);
}
function sceneReady() {
    engine.runRenderLoop(function () {
        scene.render();
    });

    cameraAnimationQueueing();
}

function cameraAnimationQueueing() {
    var inBetweenDelay = 200;

    cameraQueue.queueEventSeries([
        // start other events in an async manner, un-related to the camera's queue, after initial pause
        function(){
            sunEvent      .initialize(0, scene);
            storyContainer.addControl(storyLines[0][0]);
            storyTimeEvent.initialize(0, scene);
        },
        new QI.MotionEvent(cameraMillis * 0.9, new BABYLON.Vector3(-220, 0, 130), new BABYLON.Vector3(0, Math.PI * 0.50, 0), { pace : new QI.SinePace(QI.Pace.MODE_IN)}), // camera move around mountain
        new QI.MotionEvent(cameraMillis * 0.1, new BABYLON.Vector3(-20 , 0, -10), new BABYLON.Vector3(0, Math.PI * 0.40, 0), { millisBefore : inBetweenDelay }), // turn and face door
        doorQueuing,
        new QI.MotionEvent(doorMillis, new BABYLON.Vector3(-10, -12, 45)) // left, lower & zoom in 45
    ]);
}

function backStoryCallback(ratioComplete) {
    var asMillis = storyTime * ratioComplete;
    var cummTime = 0;
    for (var i = 0, len = storyLines.length; i < len; i++) {
        cummTime += storyLines[i][1];
        if (cummTime > asMillis){
            storyContainer.removeControl(storyContainer._rootContainer.children[0]);
            storyContainer.addControl(storyLines[i][0]);

            // start the morning sound with the 2nd line
            if (i == 1 && !morningSnd.isPlaying) {
                morningSnd.setPlaybackRate(QI.TimelineControl.Speed);
                morningSnd.play();
            }
            break;
        }
    }
}

function doorQueuing() {
    var doorLeft  = scene.getMeshByName("doorLeft");
    var doorRight = scene.getMeshByName("doorRight");
    var doorTop   = scene.getMeshByName("doorTop");

    doorLeft .queuePOV(doorMillis, new BABYLON.Vector3( 4.4, 0, 0), null, {sound: doorSnd});
    doorRight.queuePOV(doorMillis, new BABYLON.Vector3(-3.8, 0, 0));

    doorTop.queueEventSeries([new QI.MotionEvent(doorMillis, new BABYLON.Vector3(0, 1.75, 0)), doGus]);
}

function doGus() {
    storyContainer.removeControl(storyContainer._rootContainer.children[0]);

    // position, enable & change to rest pose
    var interior = scene.getMeshByName("interior");
    hero.position = interior.position.clone();
    hero.rotation = heroInitialRotation.clone();
    hero.setEnabled(true);  // only does something first run
    hero.skeleton.returnToRest();

    hero.grandEntrance();
    sceneCamera.lockedTarget = hero;

    var wrkPos = hero.position.clone();
    var wrkRot = hero.rotation.clone();
    events = [];
    // switch cam; change to pause using dialog button, so it reflects correctly
    if (useHeroCam){
        events.push(function() {toHeroCamera(); playPause();});
    }

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
    events.push(function (){ signSwing(); });

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

function signSwing() {
    // unplug hero from sceneCamera, first
    undoLockedTarget();

    var signDistance = 20;
    var rotAmt = 0.8;
    var followthru = 0.2;
    var offsetY = 0.9;
    sign.position = sceneCamera.position.add(cameraQueue.calcMovePOV(0, signUp, signDistance));
    sign.rotation = sceneCamera.rotation.clone();
    sign.rotation.z = sign.rotation.z - rotAmt;
    sign.rotation.y = sign.rotation.y - offsetY;  // make sign slightly offset from camera for hero hit

    var dnTime = 250;
    sign.queueEventSeries([
            function() { roadKill(dnTime);},
            new QI.MotionEvent(dnTime, null, new BABYLON.Vector3(0, 0, rotAmt + followthru), {sound : swingSnd}),
            new QI.MotionEvent(200   , null, new BABYLON.Vector3(0, 0, - followthru)),
            new QI.MotionEvent(700   , null, new BABYLON.Vector3(0, offsetY - 0.3, 0))
    ]);
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
            neon.intensity = 0.5;
            sign.Eye.scaling.x = sign.Pupil.scaling.x = 1.5;
            sign.Eye.scaling.y = sign.Pupil.scaling.y = 1.5;
            sign.Teeth.setEnabled(true);
        } else {
            neon.intensity = 0;
            sign.Eye.scaling.x = sign.Pupil.scaling.x = 1.0;
            sign.Eye.scaling.y = sign.Pupil.scaling.y = 1.0;
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

    scenesDialog.isVisible = true;

    // calculate absolute positions
    var atSign = sign.position.clone();
    atSign.y -= 10;  // reduce the amount sign was moved up to swing

    var finalDialogPos = sceneCamera.position.add(cameraQueue.calcMovePOV(0, 2, 15));
    var finalDialogPosEvent = new QI.MotionEvent(700, finalDialogPos, sceneCamera.rotation.clone(), {absoluteMovement : true, absoluteRotation : true});

    var finalSignPos = sceneCamera.position.add(cameraQueue.calcMovePOV(0, signUp, -1)); // behind the camera
    var finalSignPosEvent = new QI.MotionEvent(700, finalSignPos, null, {absoluteMovement : true});
    finalSignPosEvent.setSyncPartner(finalDialogPosEvent);

    // smash
    otherScenesQueue.queueEventSeries([
        new QI.MotionEvent(1500, atSign, null, {millisBefore : 2500, absoluteMovement : true, sound : crashSnd}),
        finalDialogPosEvent
    ]);

    sign.queueSingleEvent(finalSignPosEvent);
}

function undoLockedTarget() {
    if (sceneCamera.lockedTarget === null) return;

    // unplug hero from sceneCamera; code from the abstractMesh lookAt
    var v = sceneCamera.position.clone();
    v.subtractInPlace(sceneCamera.lockedTarget.position);
    sceneCamera.lockedTarget = null;

    sceneCamera.rotation.y = -Math.atan2(v.z, v.x) - Math.PI / 2;
    var len = Math.sqrt(v.x * v.x + v.z * v.z);
    sceneCamera.rotation.x = Math.atan2(v.y, len);
}

function toSceneCamera() {
    scene.switchActiveCamera(sceneCamera, false); // do not attach
    scene.activeCameras[0] = sceneCamera;
    scene.getMeshByName("Landscape").setEnabled(true);
}

function toHeroCamera() {
    scene.switchActiveCamera(heroCam, true);
    scene.activeCameras[0] = heroCam;
    scene.getMeshByName("Landscape").setEnabled(false);
}

function restartScene() {
    undoLockedTarget();
    // set everything to original positions
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

    // stop all sounds
    crashSnd.stop();
    cymbalSnd.stop();
    doorSnd.stop();
    drum1Snd.stop();
    drum2Snd.stop();
    morningSnd.stop();
    swingSnd.stop();
    ughSnd.stop();
    yesSnd.stop();

    // dispose or hide various meshes
    if (storyContainer._rootContainer.children.length > 0)
    storyContainer.removeControl(storyContainer._rootContainer.children[0]);

    hero.makeVisible(false); // also pauses the event queues on hero
    scenesDialog.isVisible = false;

    sign.setEnabled(false);

    toSceneCamera();
    cameraAnimationQueueing();
}