var web = "https://palmer-jc.github.io/scenes"; 
var local = "file:///js-dev/Palmer-JC.github.io/scenes";

var loadOtherScenes = function (scene) {
    DIALOG.DialogSys.initialize(scene);
    DIALOG.Label.DEFAULT_FONT_MODULE = 'Font2D'; // not required, 2D is the default
    DIALOG.DialogSys.CURRENT_FONT_MAT_ARRAY = DIALOG.DialogSys.WHITE;
    DIALOG.Label.NO_MERGING = false;  // not required, for dev testing only
   
    var topLevel = new DIALOG.Panel("Top", DIALOG.Panel.LAYOUT_VERTICAL, true);
    topLevel.horizontalAlignment = DIALOG.Panel.ALIGN_LEFT;
    topLevel.verticalAlignment   = DIALOG.Panel.ALIGN_BOTTOM;
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   	     
     var title = new DIALOG.Label("My Other Scenes").setFontSize(1.5).horizontalAlign(DIALOG.Panel.ALIGN_HCENTER);    
    topLevel.addSubPanel(title);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   
    var base = web;
    var menus = new DIALOG.Panel("Menus", DIALOG.Panel.LAYOUT_HORIZONTAL);
    var menu = new DIALOG.Menu("Demos:", ["Whoopstopia", "Whoopstopia Barrel", "Whoopstopia Stereo", "Dialog Extension"], DIALOG.Panel.LAYOUT_VERTICAL);
    menu.assignMenuCallback(0, function(){hyperlink(base + "/whoopstopia/index.html");} );
    menu.assignMenuCallback(1, function(){hyperlink(base + "/whoopstopia/indexBarrel.html");} );
    menu.assignMenuCallback(2, function(){hyperlink(base + "/whoopstopia/indexStereo.html");} );
    menu.assignMenuCallback(3, function(){hyperlink(base + "/dialog/index.html");} );
    menus.addSubPanel(menu);

    menu = new DIALOG.Menu("Tools:", ["Audio Recorder", "Rig Developer", "Shape Key Fingers"], DIALOG.Panel.LAYOUT_VERTICAL);
    menu.assignMenuCallback(0, function(){hyperlink(base + "/QueuedInterpolation/audio_recorder/index.html");} );
    menu.assignMenuCallback(1, function(){hyperlink(base + "/QueuedInterpolation/game_rig_tester/index.html");} );
    menu.assignMenuCallback(2, function(){hyperlink(base + "/QueuedInterpolation/finger_shapekeys/index.html");} );
    menus.addSubPanel(menu);       

    menu = new DIALOG.Menu("Blender Tests:", ["Texture Baking", "Mesh Parenting", "Flying Carpet", "Multi-Key Groups", "POV", "Armature", "Camera Animation"], DIALOG.Panel.LAYOUT_VERTICAL);
    menu.assignMenuCallback(0, function(){hyperlink(base + "/get_baked/index.html");} );
    menu.assignMenuCallback(1, function(){hyperlink(base + "/QueuedInterpolation/mesh_parent/index.html");} );
    menu.assignMenuCallback(2, function(){hyperlink(base + "/QueuedInterpolation/flying_carpet/index.html");} );
    menu.assignMenuCallback(3, function(){hyperlink(base + "/QueuedInterpolation/multi_shapekey_groups/index.html");} );
    menu.assignMenuCallback(4, function(){hyperlink(base + "/QueuedInterpolation/POV/index.html");} );
    menu.assignMenuCallback(5, function(){hyperlink(base + "/QueuedInterpolation/armature/index.html");} );
    menu.assignMenuCallback(6, function(){hyperlink(base + "/camera_anim/index.html");} );
    menus.	addSubPanel(menu);
    
    topLevel.addSubPanel(menus);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   	     
    var asRepoBtn = new DIALOG.Button("View Blog As A Repository").horizontalAlign(DIALOG.Panel.ALIGN_HCENTER).stretch(false, true);
    asRepoBtn.assignCallback(function(){ 
    	hyperlink("https://github.com/Palmer-JC/Palmer-JC.github.io")
    });
    topLevel.addSubPanel(asRepoBtn);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   	     
    return topLevel;
};

var hyperlink = function(url){
    var link = window.document.createElement("a");
    link.href = url;
    var click = document.createEvent('MouseEvents');
    click.initEvent('click', true, false);
    link.dispatchEvent(click);
};