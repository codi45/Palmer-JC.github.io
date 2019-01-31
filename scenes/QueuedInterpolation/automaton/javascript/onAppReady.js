//this is an XDK event; when not using XDK, place in <body onload="onAppReady()">
document.addEventListener("app.Ready", onAppReady, false) ;

var camera;
var model;
var currModelIdx = 0;

var idleCheck;
var randomCheck;
var focalLenDropdown;
var eyeCheck;
var blinkCheck;
var references;
var devCheck;

var keys = ["CHEEKS_HIGH", "CHEEKS_PUMP", "CHEEKS_SUCK", 
	        "EYEBROWS_ANGRY", "EYEBROWS_RAISED_LEFT", "EYEBROWS_RAISED_RIGHT",
            "WINK_BOTH_CLOSED", "EYELIDS_SQUINT", "WINK_LEFT", "WINK_RIGHT",
            "NOSE_FLARE", "TONGUE_RAISED", "TONGUE_STUCK_OUT",
            "MOUTH_CORNERS_DOWN", "MOUTH_CORNERS_UP", "MOUTH_LIPS_LOWER_OUT", "MOUTH_LIPS_LOWER_UP", "MOUTH_LIPS_UPPER_UP", "MOUTH_OPEN", "MOUTH_PUCKER", "MOUTH_WIDE",
            "SYMMETRY_CHIN_LEFT", "SYMMETRY_LEFT_UP", "SYMMETRY_RIGHT_UP"];

var defaultAxes = "YXXYYYYYYYYYZYYZYYZXXXYY"; //"YXX YYY YYYY YYZ YYZYYZXX XYY"

var sentence1;
var sentence2;
var sentence3;
var sentence4;
var sentence5;
var sentence6;
var sentence7;

function onAppReady() {
    if( navigator.splashscreen && navigator.splashscreen.hide) {   // Cordova API detected
        navigator.splashscreen.hide();
    }
    
    var expDegree = document.getElementById("expDegree");
    expDegree.value = 9;

    idleCheck = document.getElementById("idleMode");
    idleCheck.checked = false;
    
    randomCheck = document.getElementById("randomSwitching");
    randomCheck.checked = false;
    
    focalLenDropdown = document.getElementById("focalLength");
    focalLenDropdown.selectedIndex = 3;
    
    eyeCheck = document.getElementById("randomEyes");
    eyeCheck.checked = false;
     
    blinkCheck = document.getElementById("blinking");
    blinkCheck.checked = false;
    
    references = document.getElementById("links");
    references.selectedIndex = -1;
    
    devCheck = document.getElementById("devModeCheck");
    devCheck.checked = false;
    resetDevControls(false);
    
    if (BABYLON.Engine.isSupported()) {
	    var canvas = document.getElementById("renderCanvas");
	    canvas.screencanvas = true; // for CocoonJS
	    var engine = new BABYLON.Engine(canvas, true, { stencil: true });
	
	    var scene = new BABYLON.Scene(engine);
	    scene.clearColor = new BABYLON.Color3(.5,.5,.5);
	    
	    // must have a scene before can be loaded
	    sentence1 = new VoiceSync.whereAmI         ("./audio/whereAmI.wav"         , scene);
	    sentence2 = new VoiceSync.howDidI          ("./audio/howDidI.wav"          , scene); 
	    sentence3 = new VoiceSync.getMeOut         ("./audio/getMeOut.wav"         , scene);
	    sentence4 = new VoiceSync.iAmMelting       ("./audio/iAmMelting.wav"       , scene);
	    sentence5 = new VoiceSync.cleanUpAisle4    ("./audio/cleanUpAisle4.wav"    , scene);
	    sentence6 = new VoiceSync.IchBinEinBerliner("./audio/IchBinEinBerliner.mp3", scene);
	    sentence7 = new VoiceSync.batman           ("./audio/batman.wav"           , scene);
	    	    
		// assign the scene to the preloader
	    TOWER_OF_BABEL.Preloader.SCENE = scene;
	    TOWER_OF_BABEL.Preloader.READ_AHEAD_LOGGING = true;	// just for time diagnostics in console, not production	

        camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, 1.6, 25, BABYLON.Vector3.Zero(), scene);
        camera.wheelPrecision = 50;
        camera.fov = 0.265103; // 120mm focal length
	    camera.angularSensibilityY = Infinity;
        camera.attachControl(canvas);   

        var camlight = new BABYLON.PointLight("Lamp", BABYLON.Vector3.Zero(), scene);
        camlight.specular = new BABYLON.Color3(0.5, 0.5, 0.5);
        scene.beforeCameraRender = function () {
            var cam = (scene.activeCameras.length > 0) ? scene.activeCameras[0] : scene.activeCamera;
            // move the light to match where the camera is
            camlight.position = cam.position;
            camlight.rotation = cam.rotation;
        };
        
        nextModel();
        
        engine.runRenderLoop(function () { scene.render(); });
	    
    }else{
        alert("WebGL not supported in this browser.");
    }

    //Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });
}

function changeFocalLength() {
    var length  = Number(focalLenDropdown.options[focalLenDropdown.selectedIndex].value);
    camera.fov = length;
}

function nextModel() {
	// the characterJukebox preloader initialized in reloadables.js
    var character = characterJukebox.pickBust(currModelIdx++);      
    character.makeReady(function() {
    	if (model) model.dispose();
    	model = character.instance("my_model");
    	model.addStockExpressions("", true);
    	// expression components needed here for expression development, but very wasteful in real scenes
//    	model.removeExpressionComponents();
    	loadAvailableExpressions();
    	applySettings();
    	camera.setTarget(model, true);   
    	
    	// only does something the first time
    	// ensure does not run until the grand entrance hsa completed
    	model.queueSingleEvent(function(){ characterJukebox.prepRemainingBusts(); });
    });
    if (currModelIdx >= characterJukebox.numBusts) currModelIdx = 0;
}

function applySettings() {
    if (devCheck.checked) {
    	constructExpression();
    } else {
    	assignChosenExpression();
    	assignRandomSwitching();
    	assignIdleMode();
    	assignBlink();
    }
	assignEyes();
}

function loadAvailableExpressions() {
    var expDropdown = document.getElementById("expression");
    if (expDropdown.options.length > 0) return; // in-case of reload / model change

    loadExpressions(expDropdown, model.getExpressionNames(), "Expressions");
    loadExpressions(expDropdown, model.getVisemeNames    (), "Visemes");
    
    expDropdown.selectedIndex = 0;
}

function loadExpressions(expDropdown, names, groupName) {
    var group = document.createElement('optgroup');
    group.label = groupName;
    expDropdown.appendChild(group);
    
    for (var i = 0; i <names.length; i++) {
        var opt = document.createElement('option');
        opt.value = Number(i);
        opt.innerHTML = names[i];
        expDropdown.appendChild(opt);
    }
}

function assignChosenExpression() {
	resetDevControls(false);
    
	var frm = document.getElementById("mainform");
    if (frm.expression.selectedIndex === -1) return;
    
    var expName = frm.expression.options[frm.expression.selectedIndex].text;
    var expDegree  = Number(frm.expDegree.value);
    
    // transfer the setting of the expression to the dev controls for more working
    var expression = model.setCurrentMood(expName, expDegree);
    if (!expression || !expression.endStateNames) return;
    
    frm.NAME.value           = expression.name;
    frm.winkable.checked     = expression.winkable;
    frm.blinkable.checked    = expression.blinkable;
    frm.randomizable.checked = expression.randomizable;
    
    for (var i = 0; i < expression.endStateNames.length; i++) {
        var base = expression.endStateNames[i];
        document.getElementById(base).value = expression.endStateRatios[i];
        document.getElementById(base + "_MIRROR").value = expression.mirrorReqd ? expression.mirrorAxes.charAt(i) : "-";
    }
}

function assignIdleMode() {
	var on = idleCheck.checked;
    model.setIdleMode(on);
    
    // Automaton automatically turns off random too, make sure display reflects this
    if (randomCheck.checked && !on) randomCheck.checked = false;
}

function assignRandomSwitching() {
	var on = randomCheck.checked;
    model.setRandomExpressionSwitching(on);
    
    // Automaton automatically turns on idle when random, make sure display reflects this
    if (!idleCheck.checked && on) idleCheck.checked = true;
}

function assignEyes() {
	model.doRandomEyes = eyeCheck.checked;
}

function assignBlink() {
	model.doInvoluntaryBlinking = blinkCheck.checked;
}

function winkLeft() {
	model.winkLeft();
}

function winkRight() {
	model.winkRight();
}

function blink() {
	model.blink();
}

function eyesRight() {
	model.queueEyeRotation(0, -1);
}

function eyesLeft() {
	model.queueEyeRotation(0, 1);
}

function eyesUp() {
	model.queueEyeRotation(1, 0);
}

function eyesDown() {
	model.queueEyeRotation(-1, 0);
}

function talk() {
	sentence1.say(model, true); model.queueSingleEvent(new QI.Stall(350, "FACE"));
	sentence2.say(model); model.queueSingleEvent(new QI.Stall(350, "FACE"));
	sentence3.say(model); model.queueSingleEvent(new QI.Stall(350, "FACE"));
	sentence4.say(model); model.queueSingleEvent(new QI.Stall(350, "FACE"));
	sentence4.say(model); model.queueSingleEvent(new QI.Stall(350, "FACE"));
	sentence5.say(model); model.queueSingleEvent(new QI.Stall(350, "FACE"));
	sentence6.say(model); model.queueSingleEvent(new QI.Stall(350, "FACE"));
	model.queueEventSeries(new QI.EventSeries([function(){QI.TimelineControl.Speed = 0.6;}], 1, 1, "FACE")); // slow down
	sentence6.say(model); model.queueSingleEvent(new QI.Stall(350, "FACE"));
	model.queueEventSeries(new QI.EventSeries([function(){QI.TimelineControl.Speed = 1.4;}], 1, 1, "FACE")); // speed up
	sentence6.say(model); model.queueSingleEvent(new QI.Stall(350, "FACE"));
	model.queueEventSeries(new QI.EventSeries([function(){QI.TimelineControl.Speed = 1.0;}], 1, 1, "FACE")); // normal speed
	sentence7.say(model, false, true);
}

function linkup() {
	var url = references.options[references.selectedIndex].value;
	
    var link = window.document.createElement("a");
    link.href = url;
    var click = document.createEvent('MouseEvents');
    click.initEvent('click', true, false);
    link.dispatchEvent(click);
}

function devMode() {
	var frm = document.getElementById("mainform");
    var isDev = devCheck.checked;
    
    // disable / enable exerciser controls
    frm.idleMode.disabled = isDev;
    frm.randomSwitching.disabled = isDev;
    frm.expression.disabled = isDev;
    frm.expDegree.disabled = isDev;
    document.getElementById("talkBtn").disabled = isDev;
    frm.blinking.disabled = isDev;
    frm.RWink.disabled = isDev;
    frm.lWink.disabled = isDev;
    frm.Blink.disabled = isDev;
    
    // disable / enable dev controls
    frm.NAME.disabled          = !isDev;
    frm.winkable.disabled      = !isDev;
    frm.blinkable.disabled     = !isDev;
    frm.randomizable.disabled  = !isDev;
    frm.reset.disabled         = !isDev;
    frm.logger.disabled        = !isDev;
    
    for (var i = 0; i < keys.length; i++) {
        var base = keys[i];
        document.getElementById(base).disabled = !isDev;
        document.getElementById(base + "_MIRROR").disabled = !isDev;
    }  
}

function resetDevControls(pose) {
 	var frm = document.getElementById("mainform");
    frm.NAME.value            = "";
    frm.winkable.checked      = false;
    frm.blinkable.checked     = false;
    frm.randomizable.checked  = false;
    
    for (var i = 0; i < keys.length; i++) {
        var base = keys[i];
        document.getElementById(base).value = 0;
        document.getElementById(base + "_MIRROR").value = "-";
    }
    
    if (pose) constructExpression();
    else devMode();
}

function constructExpression(forLogging) {
 	var frm = document.getElementById("mainform");
    var names = [];
    var ratios = [];
    var mirrorAxes = "";
    var val;
    var m;
    var mirrorElement;
    
    for (var i = 0; i < keys.length; i++) {
        var base = keys[i];
        mirrorElement = document.getElementById(base + "_MIRROR");
        
        val = Number(document.getElementById(base).value);
	    if (val !== 0) {
	        names.push(base);
	        ratios.push(val);
	        
	        m = mirrorElement.value;
	        if (val < 0 && m === "-") m = defaultAxes.substr(i, 1);
	        else if (val >= 0) m = "-";
	        mirrorElement.value = m;
	        mirrorAxes += m;
	   
        } else mirrorElement.value = "-";
    }
    var name = frm.NAME.value;
    if (name.length === 0) name = "untitled";
    else if (!forLogging) name += "_edited"; // make sure a non-permanent expression is the case
    
    var exp = new QI.Expression(name, frm.winkable.checked, frm.blinkable.checked, frm.randomizable.checked, names, ratios, mirrorAxes);
    if (forLogging) return exp;
    
    model.setCurrentMood(exp, 1);
}

function logChanges(){
	console.log(constructExpression(true).toScript());
}