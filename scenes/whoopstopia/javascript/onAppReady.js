function onAppReady() {
    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        navigator.splashscreen.hide() ;
    }
    
    if (BABYLON.Engine.isSupported()) {
	    var canvas = document.getElementById("renderCanvas");
	    canvas.screencanvas = true; // for CocoonJS
	    var engine = new BABYLON.Engine(canvas, true);
	
	    var scene = new BABYLON.Scene(engine);
	    materialsRootDir = "./images";
	        
	    // add scene specific code
	    landscape.initScene(scene, materialsRootDir);
	    
		// Sky material
		var skyboxMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
	    skyboxMaterial.backFaceCulling = false;
		skyboxMaterial._cachedDefines.FOG = true;
		skyboxMaterial.inclination = -0.5;
		
		var skybox = scene.getMeshByName("skyBox");
		skybox.material = skyboxMaterial;
		
        var light = new BABYLON.PointLight("point", BABYLON.Vector3.Zero(), scene);
        light.intensity = 1;
            
        scene.beforeCameraRender = function () {
            light.position = scene.activeCamera.position;
        };
	    
	    scene.activeCamera.attachControl(canvas);
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
// this is an XDK event; when not using XDK, place in <body onload="onAppReady()">
document.addEventListener("app.Ready", onAppReady, false) ;