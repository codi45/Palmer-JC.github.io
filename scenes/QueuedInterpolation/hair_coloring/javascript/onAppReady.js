//this is an XDK event; when not using XDK, place in <body onload="onAppReady()">
document.addEventListener("app.Ready", onAppReady, false) ;

var scene;
var camera;
var model;
var hair;
var currModelIdx = 2; // woman is index 2

// styles
var moduleNames = new Array(3);
var classNames  = new Array(3);
var currentStyle;

var fpsLabel;
var unitSel;
var strandWidthSel;
var stdColors;
var redSlider  , redAsTxt;
var greenSlider, greenAsTxt;
var blueSlider , blueAsTxt;
var interSpreadSlider, interSpreadAsTxt;
var intraSpreadSlider, intraSpreadAsTxt;
var stiffnessSlider, stiffnessAsTxt;
var emissiveScalingSlider, emissiveScalingAsTxt;
var randomSeedAsTxt;
var references;

function onAppReady() {
    if( navigator.splashscreen && navigator.splashscreen.hide) {   // Cordova API detected
        navigator.splashscreen.hide();
    }
    
//    loadLibrary("../../../characters/javascript/hair", "myModule" , "mohawk" , 0, true);
    loadLibrary("../../../characters/javascript/hair", "longBrown" , "longHair" , 0, true);
    loadLibrary("../../../characters/javascript/hair", "shortBlack", "shortHair", 1, true);
    
    fpsLabel = document.getElementById("fpsLabel");
    
    unitSel = document.getElementById("unitSel");
    unitSel.selectedIndex = -1;
    
    strandWidthSel = document.getElementById("strandWidthSel");
    strandWidthSel.selectedIndex = -1;
    
    stdColors = document.getElementById("stdColors");
    stdColors.selectedIndex = -1;
    
    redSlider = document.getElementById("RED_SLIDER");     
    redAsTxt = document.getElementById("RED_AS_TXT");
    
    greenSlider = document.getElementById("GREEN_SLIDER");     
    greenAsTxt = document.getElementById("GREEN_AS_TXT");
    
    blueSlider = document.getElementById("BLUE_SLIDER");     
    blueAsTxt = document.getElementById("BLUE_AS_TXT");
    
    interSpreadSlider = document.getElementById("INTER_SPREAD_SLIDER");
    interSpreadAsTxt = document.getElementById("INTER_SPREAD_AS_TXT");
    
    intraSpreadSlider = document.getElementById("INTRA_SPREAD_SLIDER");
    intraSpreadAsTxt = document.getElementById("INTRA_SPREAD_AS_TXT");
    
    stiffnessSlider = document.getElementById("STIFFNESS_SLIDER");
    stiffnessAsTxt = document.getElementById("STIFFNESS_AS_TXT");    
    
    emissiveScalingSlider = document.getElementById("EMISSIVE_SCALING_SLIDER");
    emissiveScalingAsTxt = document.getElementById("EMISSIVE_SCALING_AS_TXT");
    
    randomSeedAsTxt = document.getElementById("RANDOM_SEED_AS_TXT");
    
    references = document.getElementById("links");
    references.selectedIndex = -1;
    
    if (BABYLON.Engine.isSupported()) {
	    var canvas = document.getElementById("renderCanvas");
	    canvas.screencanvas = true; // for CocoonJS
	    var engine = new BABYLON.Engine(canvas, true, { stencil: true });
	
	    scene = new BABYLON.Scene(engine);
	    scene.clearColor = new BABYLON.Color3(.5,.5,.5);
	    
		// assign the scene to the preloader
	    TOWER_OF_BABEL.Preloader.SCENE = scene;

        camera = new QI.CylinderCamera("Camera", true, -Math.PI / 2, 20, scene);
        camera.wheelPrecision = 10;
        camera.fov = 0.265103; // 120mm focal length
        camera.attachControl(canvas);   

        var camlight = new BABYLON.PointLight("Lamp", new BABYLON.Vector3(0, 0, -5), scene);
        scene.beforeCameraRender = function () {
            var cam = (scene.activeCameras.length > 0) ? scene.activeCameras[0] : scene.activeCamera;
            // move the light to match where the camera is
            camlight.position = cam.position;
            camlight.rotation = cam.rotation;
        };
        
        nextModel();
        
        engine.runRenderLoop(function () {
        	scene.render();
        	var value = engine.getFps().toFixed() + " fps";
        	if (hair) value += ", " + (hair.getTotalVertices() / 1000).toFixed() + "K Verts";
        	fpsLabel.value = value;
        });
	    
    }else{
        alert("WebGL not supported in this browser.");
    }

    //Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });
}

function nextModel() {
	// the characterJukebox preloader initialized in reloadables.js
    var character = characterJukebox.pickCharacter(currModelIdx++);      
    character.makeReady(function() {
    	if (model) model.dispose();
    	model = character.instance("my_model");
    	model.addStockExpressions("HAPPY LAUGH SKEPTICAL", false);
    	camera.setTargetMesh(model, false); 
     	camera._traverseOffset = model.getBoundingInfo().boundingBox.extendSize.y * 1.75; // 3 quarter up the body (extendSize is like radius)
    	model.removeExpressionComponents();
    	
    	model.doRandomEyes = true;
    	model.doInvoluntaryBlinking = true;
    	model.deformImmediately("FACE", "HAPPY");
        model.setRandomExpressionSwitching(true);
    	model.assignPoseLibrary("game_rig_library");
//    	idle(model);
    	
    	// find the hair mesh
    	var kids = model.getChildMeshes();
        for (var i = 0, len = kids.length; i < len; i++) {
        	if (kids[i] instanceof QI.Hair) {
        		hair = kids[i];
        		break;
        	}
        }
        if (hair) assignFromHairLoad();
        
    	// only does something the first time
    	// ensure does not run until the grand entrance hsa completed
//    	model.queueSingleEvent(function(){ characterJukebox.prepRemainingBusts(); });
    });
    if (currModelIdx >= characterJukebox.numBusts) currModelIdx = 0;
}

var lastStatus = "CUSTOM";
function assignColor(status, propertiesOnly) {
	if (status === "LAST") status = lastStatus;
	lastStatus = status;
	
	// reflect any changes to UI
	var rgbValues;
	switch (status) {
		case 'STD':
			var colorName = stdColors.options[stdColors.selectedIndex].value;
			rgbValues = QI.Hair._Colors[colorName];
			
			redSlider  .value = rgbValues.r;
			greenSlider.value = rgbValues.g;
			blueSlider .value = rgbValues.b;
			
			hair.namedColor = colorName;			
			break;
			
		case 'CUSTOM':
			stdColors.selectedIndex = -1;
			var red   = redSlider  .value;
			var green = greenSlider.value;
			var blue  = blueSlider .value;
			rgbValues = new BABYLON.Color3(red, green, blue);
			
			hair.color = rgbValues;
			break;
	}
	
	// assign rest of properties; reassemble
	hair.interStrandColorSpread = interSpreadSlider.value;
	hair.intraStrandColorSpread = intraSpreadSlider.value;
	hair.emissiveColorScaling   = emissiveScalingSlider.value;
	
	// assign the text fields regardless
	setSliderTxt(rgbValues);
	
	if (!propertiesOnly) hair.assignVertexColor();
}

function assignFromHairLoad() {
	unitSel.value = hair.unit;
	strandWidthSel.value = hair.strandWidth;
	
    // set controls based on how it was exported
    interSpreadSlider.value = hair.interStrandColorSpread;
    intraSpreadSlider.value = hair.intraStrandColorSpread;
    emissiveScalingSlider.value = hair.emissiveColorScaling;

	var rgbValues;
    if (hair.namedColor) {
    	stdColors.value = hair.namedColor;
    	rgbValues = QI.Hair._Colors[hair.namedColor];
    	setSliderTxt(rgbValues);
    }
    else {
    	stdColors.selectedIndex = -1;
    	rgbValues = hair.color;
    }
	redSlider  .value = hair.color.r;
	greenSlider.value = hair.color.g;
	blueSlider .value = hair.color.b;
	setSliderTxt(hair.color);
}

function assignWeightsAsColor() {
	hair.assignWeightsAsColor();
}

function setSliderTxt(color) {
	redAsTxt  .value = color.r;
	greenAsTxt.value = color.g;
	blueAsTxt .value = color.b;
	interSpreadAsTxt.value = hair.interStrandColorSpread;
	intraSpreadAsTxt.value = hair.intraStrandColorSpread;
	emissiveScalingAsTxt.value = hair.emissiveColorScaling;
}

function headLeft() {
	model.clearAllSubPoses();
	model.addSubPose("head left.sp", 500);
}

function headDown() {
	model.clearAllSubPoses();
	model.addSubPose("head down.sp", 500);
}

function headRight() {
	model.clearAllSubPoses();
	model.addSubPose("head right.sp", 500);
}

function adjustWidth() {
	assignHair(currentStyle, true);
}

function dynaLoad() {
	var jsPath = document.getElementById("JS_PATH_TXT").value;
	var moduleNm = document.getElementById("MODULE_TXT").value;
	var classNm = document.getElementById("CLASS_TXT").value;
	loadLibrary(jsPath, moduleNm, classNm, 2);
}

function loadLibrary(jsPath, moduleNm, classNm, style, skipAssign) {
	moduleNames[style] = moduleNm;
	classNames [style] = classNm;
	var needsLoading;
	eval("needsLoading = typeof(" + moduleNm + ") === 'undefined'");

	if (needsLoading) {
        if (jsPath .lastIndexOf("/") + 1  !== jsPath .length) jsPath  += "/";
        var hairElem = document.createElement("script");
        hairElem.type = "application/javascript";
        hairElem.src = jsPath + moduleNm + ".js";
        
        document.body.appendChild(hairElem);        
        if (!skipAssign) hairElem.onload = function() { assignHair(style); };
        
	} else {
		if (!skipAssign) assignHair(style);
	}
}

function assignHair(style, assignFromControls) {
	strandWidthSel.disabled = false;
	currentStyle = style;
	if (hair) hair.dispose();
	
	eval("hair = new " + moduleNames[style] + "." + classNames[style] + "('Style-" + style + "', scene)");
	
	hair.assignParentDynamically(model, true);
	if (assignFromControls) {
		hair.unit = unitSel.value;
		hair.strandWidth = strandWidthSel.value;
		assignColor(lastStatus, true);
	}
	hair.assemble();
	assignFromHairLoad();
}

function linkup() {
	var url = references.options[references.selectedIndex].value;
	
    var link = window.document.createElement("a");
    link.href = url;
    var click = document.createEvent('MouseEvents');
    click.initEvent('click', true, false);
    link.dispatchEvent(click);
}

function makeSnap() {
	var kids = model.getChildren();
	for (var i = 0, len = kids.length; i < len; i++){
		if (!(kids[i] instanceof QI.Hair) ) kids[i].isVisible = false;
	}
	model.isVisible = false;
}