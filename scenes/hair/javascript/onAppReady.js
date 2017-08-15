function onAppReady() {
    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        navigator.splashscreen.hide() ;
    }
    
    if (BABYLON.Engine.isSupported()) {
	    var canvas = document.getElementById("renderCanvas");
	    canvas.screencanvas = true; // for CocoonJS
	    var engine = new BABYLON.Engine(canvas, true, { stencil: true });
	
	    var scene = new BABYLON.Scene(engine);
	    scene.debugLayer.show(true);
	    var materialsRootDir = "./images";
	        
	    // add scene specific code
	    strands2.initScene(scene, materialsRootDir);
	    
	    scene.activeCamera.wheelPrecision = 50;	    
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