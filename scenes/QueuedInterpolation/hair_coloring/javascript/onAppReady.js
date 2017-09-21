//this is an XDK event; when not using XDK, place in <body onload="onAppReady()">
document.addEventListener("app.Ready", onAppReady, false) ;

var camera;
var model;
var hair;
var currModelIdx = 2; // woman is index 2

var fpsLabel;
var stdColors;
var redSlider  , redAsTxt;
var greenSlider, greenAsTxt;
var blueSlider , blueAsTxt;
var alphaSlider , alphaAsTxt;
var randomSeedAsTxt;
var spreadSlider, spreadAsTxt;
var references;

function onAppReady() {
    if( navigator.splashscreen && navigator.splashscreen.hide) {   // Cordova API detected
        navigator.splashscreen.hide();
    }
    
    fpsLabel = document.getElementById("fpsLabel");
    
    stdColors = document.getElementById("stdColors");
    stdColors.selectedIndex = -1;
    
    redSlider = document.getElementById("RED_SLIDER");     
    redAsTxt = document.getElementById("RED_AS_TXT");
    
    greenSlider = document.getElementById("GREEN_SLIDER");     
    greenAsTxt = document.getElementById("GREEN_AS_TXT");
    
    blueSlider = document.getElementById("BLUE_SLIDER");     
    blueAsTxt = document.getElementById("BLUE_AS_TXT");
    
    alphaSlider = document.getElementById("ALPHA_SLIDER");     
    alphaAsTxt = document.getElementById("ALPHA_AS_TXT");
    
    randomSeedAsTxt = document.getElementById("RANDOM_SEED_AS_TXT");
    
    spreadSlider = document.getElementById("SPREAD_SLIDER");
    spreadAsTxt = document.getElementById("SPREAD_AS_TXT");
    
    references = document.getElementById("links");
    references.selectedIndex = -1;
    
    if (BABYLON.Engine.isSupported()) {
	    var canvas = document.getElementById("renderCanvas");
	    canvas.screencanvas = true; // for CocoonJS
	    var engine = new BABYLON.Engine(canvas, true, { stencil: true });
	
	    var scene = new BABYLON.Scene(engine);
	    scene.clearColor = new BABYLON.Color3(.5,.5,.5);
	    
		// assign the scene to the preloader
	    TOWER_OF_BABEL.Preloader.SCENE = scene;

        camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, 1.6, 25, BABYLON.Vector3.Zero(), scene);
        camera.wheelPrecision = 50;
        camera.fov = 0.265103; // 120mm focal length
//	    camera.angularSensibilityY = Infinity;
        camera.attachControl(canvas);   

        var camlight = new BABYLON.PointLight("Lamp", new BABYLON.Vector3(0, 0, -5), scene);
        camlight.specular = new BABYLON.Color3(0, 0, 0);
        camlight.specularPower = 0;
        scene.beforeCameraRender = function () {
            var cam = (scene.activeCameras.length > 0) ? scene.activeCameras[0] : scene.activeCamera;
            // move the light to match where the camera is
            camlight.position = cam.position;
            camlight.rotation = cam.rotation;
        };
        
        nextModel();
        
        engine.runRenderLoop(function () {
        	scene.render();
        	fpsLabel.value = engine.getFps().toFixed() + " fps";
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
    var character = characterJukebox.pickBust(currModelIdx++);      
    character.makeReady(function() {
    	if (model) model.dispose();
    	model = character.instance("my_model");
    	model.addStockExpressions("HAPPY LAUGH SKEPTICAL", false);
    	model.removeExpressionComponents();
    	
    	model.doRandomEyes = true;
    	model.doInvoluntaryBlinking = true;
    	model.deformImmediately("FACE", "HAPPY");
        model.setRandomExpressionSwitching(true);
    	
    	// find the hair mesh
    	var kids = model.getChildMeshes();
        for (var i = 0, len = kids.length; i < len; i++) {
        	if (kids[i] instanceof QI.Hair) {
        		hair = kids[i];
        		break;
        	}
        }
        
        // set controls based on how it was exported
        randomSeedAsTxt.value = hair.seed;
        alphaSlider.value = (hair.alpha * 255).toFixed();
        spreadSlider.value = (hair.colorSpread * 255).toFixed();
        
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
    	redSlider  .value = (hair.color.r * 255).toFixed();
		greenSlider.value = (hair.color.g * 255).toFixed();
		blueSlider .value = (hair.color.b * 255).toFixed();
		setSliderTxt(hair.color);
        
    	camera.setTarget(model.Hair, true);   
    	
    	// only does something the first time
    	// ensure does not run until the grand entrance hsa completed
//    	model.queueSingleEvent(function(){ characterJukebox.prepRemainingBusts(); });
    });
    if (currModelIdx >= characterJukebox.numBusts) currModelIdx = 0;
}

var lastStatus = "CUSTOM";
function assignColor(status) {
	if (status === "LAST") status = lastStatus;
	lastStatus = status;
	
	// reflect any changes to UI
	hair.alpha = alphaSlider.value / 255;
	
	var rgbValues;
	switch (status) {
		case 'STD':
			var colorName = stdColors.options[stdColors.selectedIndex].value;
			rgbValues = QI.Hair._Colors[colorName];
			
			redSlider  .value = (rgbValues.r * 255).toFixed();
			greenSlider.value = (rgbValues.g * 255).toFixed();
			blueSlider .value = (rgbValues.b * 255).toFixed();
			
			hair.namedColor = colorName;			
			break;
			
		case 'CUSTOM':
			stdColors.selectedIndex = -1;
			var red   = redSlider  .value / 255;
			var green = greenSlider.value / 255;
			var blue  = blueSlider .value / 255;
			rgbValues = new BABYLON.Color3(red, green, blue);
			
			hair.color = rgbValues;
			break;
	}
	
	// assign rest of properties; reassemble
	hair.seed = randomSeedAsTxt.value;
	hair.alpha = alphaSlider.value / 255;
	hair.colorSpread = spreadSlider.value / 255;
	
	// assign the text fields regardless
	setSliderTxt(rgbValues);
	
	hair.assignVertexColor();
	
}

function setSliderTxt(color) {
	redAsTxt  .value = color.r.toFixed(3);
	greenAsTxt.value = color.g.toFixed(3);
	blueAsTxt .value = color.b.toFixed(3);
	alphaAsTxt.value = hair.alpha.toFixed(3);
	spreadAsTxt.value = hair.colorSpread.toFixed(3);
}

function linkup() {
	var url = references.options[references.selectedIndex].value;
	
    var link = window.document.createElement("a");
    link.href = url;
    var click = document.createEvent('MouseEvents');
    click.initEvent('click', true, false);
    link.dispatchEvent(click);
}

