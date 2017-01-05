function onAppReady() {
    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        navigator.splashscreen.hide() ;
    }
    
    if (BABYLON.Engine.isSupported()) {
	    var canvas = document.getElementById("renderCanvas");
	    canvas.screencanvas = true; // for CocoonJS
	    var engine = new BABYLON.Engine(canvas, true);
	    var available = ['-astc.ktx', '-dxt.ktx', '-pvrtc.ktx', '-etc2-.ktx', '-etc1.ktx'];
	    var formatUsed = engine.setTextureFormatToUse(available);
	
        document.getElementById("available").value = available;
        document.getElementById("supported").value = engine.texturesSupported;
        document.getElementById("chosen"   ).value = formatUsed;

	    var scene = new BABYLON.Scene(engine);
	    materialsRootDir = "./images";
	        
	    // add scene specific code
	    compTex.initScene(scene, materialsRootDir);	 
	    
	    var formats = '';
	    for (var i = 0; i < engine.texturesSupported.length; i++) {
	    	formats += engine.texturesSupported[i] + ' ';
	    }
	    
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