function onAppReady() {
	if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
	    navigator.splashscreen.hide() ;
	}

	if (BABYLON.Engine.isSupported()) {
	    var canvas = document.getElementById("renderCanvas");
	    var engine = new BABYLON.Engine(canvas, true, { stencil: true });

	    var scene = new BABYLON.Scene(engine);
	    	    
	    var box = new primatives.ColoredCube("box", scene);
	    
	    var camera = new QI.CylinderCamera("camera", true, Math.PI / 2, 20, scene, box);
        camera.wheelPrecision = 10;
	    camera.attachControl(canvas);
	    
	    var light = new BABYLON.PointLight("point", BABYLON.Vector3.Zero(), scene);
	    light.intensity = 1;
	        
	    scene.beforeCameraRender = function () {
	        light.position = scene.activeCamera.position;
	    };
	    
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