function onAppReady() {
    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        navigator.splashscreen.hide() ;
    }
    
    if (BABYLON.Engine.isSupported()) {
	    var canvas = document.getElementById("renderCanvas");
	    canvas.screencanvas = true; // for CocoonJS
	    var engine = new BABYLON.Engine(canvas, true);
	    engine.setTextureFormatToUse(['.pvr', '.dds']);
	
	    var scene = new BABYLON.Scene(engine);
	    materialsRootDir = "./images";
	        
	    // add scene specific code
	    compTex.initScene(scene, materialsRootDir);	 
	    
	    DIALOG.DialogSys.initialize(scene);
	    DIALOG.Label.DEFAULT_FONT_MODULE = 'Font2D'; // not required, 2D is the default
	    DIALOG.DialogSys.CURRENT_FONT_MAT_ARRAY = DIALOG.DialogSys.WHITE;
	    DIALOG.Label.NO_MERGING = false;  // not required, for dev testing only
	    
	    var formats = '';
	    for (var i = 0; i < engine.texturesSupported.length; i++) {
	    	formats += engine.texturesSupported[i] + ' ';
	    }
	    var report = new DIALOG.Label("Compressed textures formats HW supports: [ " + formats + "]");
	    report.unfreezeWorldMatrixTree();
	    
	    
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