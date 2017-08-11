var web = "https://palmer-jc.github.io/scenes"; 
var local = "file://W:/Palmer-JC.github.io/scenes";
var maxButtons = 5;

// heights (in px)
var buttonHeight = 50;
var buttonPaddingTop = 4;
var mainTitleHeight = 50;
var colTitleHeight = 40;

var maxColHeight = maxButtons * (buttonHeight + buttonPaddingTop) + colTitleHeight;
var columnWidth = 300;

var loadOtherScenes = function (scene, hostOrWidthDim) {
	
	var height = 2 * (buttonHeight + buttonPaddingTop) + mainTitleHeight + maxColHeight;
	var UIMesh = (hostOrWidthDim instanceof BABYLON.Mesh) ? hostOrDim : new BABYLON.Mesh.CreatePlane("UIMesh", hostOrWidthDim, scene);
	
	var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(UIMesh, 1024, 1024);
	
	var topLevel = new BABYLON.GUI.StackPanel();
	topLevel.isVertical = true;
	topLevel.height = height + "px";
	topLevel.width = 3 * columnWidth + "px";
	topLevel.background = "Gray";
	
    var title = new BABYLON.GUI.TextBlock("main", "My Scenes");
    title.fontSize = 36;
    title.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    title.height = mainTitleHeight + "px";
    title.color = "black";
    topLevel.addControl(title);
    advancedTexture.addControl(topLevel);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   
    var columns = new BABYLON.GUI.StackPanel();
    columns.isVertical = false;
    columns.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    columns.height = maxColHeight + "px";
    topLevel.addControl(columns);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   
    var demoPanel = new BABYLON.GUI.StackPanel();
    demoPanel.isVertical = true;
    demoPanel.width = columnWidth + "px";
    demoPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    
    var title = new BABYLON.GUI.TextBlock("demo", "Demos:");
    title.height = colTitleHeight + "px";
    title.color = "black";
    demoPanel.addControl(title);
    columns.addControl(demoPanel);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   
    var toolsPanel = new BABYLON.GUI.StackPanel();
    toolsPanel.isVertical = true;
    toolsPanel.width = columnWidth + "px";
    toolsPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    
    title = new BABYLON.GUI.TextBlock("tool", "Tools:");
    title.height = colTitleHeight + "px";
    title.color = "black";
    toolsPanel.addControl(title);
    columns.addControl(toolsPanel);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   
    var BlenderPanel = new BABYLON.GUI.StackPanel();
    BlenderPanel.isVertical = true;
    BlenderPanel.width = columnWidth + "px";
    BlenderPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    
    title = new BABYLON.GUI.TextBlock("blender", "Blender Tests:");
    title.height = colTitleHeight + "px";
    title.color = "black";
    BlenderPanel.addControl(title);
    columns.addControl(BlenderPanel);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   
    var addButton = function(label, baseUrl, parent) {
        var button = new BABYLON.GUI.Button.CreateSimpleButton(label, label);
        button.width = "100%";
        button.height = buttonHeight + "px";
        button.cornerRadius = 5;

        button.color = "white";
   //     button.children[0].color = "black";
        button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
        button.background = "Maroon";
        
        button.paddingLeft  = 5;
        button.paddingRight = 5;
        button.paddingTop   = buttonPaddingTop;
        
        button.onPointerUpObservable.add(function() {
            hyperlink(baseUrl);
        });
        parent.addControl(button);  
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   
    var base = local;
    addButton("Whoopstopia"        , base + "/whoopstopia/index.html", demoPanel);	
    addButton("Blow Me, Baby"      , base + "/blow_me_baby/index.html", demoPanel);	
    addButton("Flying Carpet"      , base + "/QueuedInterpolation/flying_carpet/index.html", demoPanel);	
    addButton("Compressed Textures", base + "/mansion/index.html", demoPanel);	
    addButton("POV"                , base + "/QueuedInterpolation/POV/index.html", demoPanel);	
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   
    addButton("Automaton QA"     , base + "/QueuedInterpolation/automaton/index.html", toolsPanel);
    addButton("Shape Key Fingers", base + "/QueuedInterpolation/finger_shapekeys/index.html", toolsPanel);
    addButton("Grand Entrances"  , base + "/QueuedInterpolation/grand_entrances/index.html", toolsPanel);
    addButton("Particle Hair Coloring"  , base + "/QueuedInterpolation/hair_coloring/index.html", toolsPanel);
//    addButton("Rig Developer"    , base + "/QueuedInterpolation/game_rig_tester/index.html", toolsPanel);
    addButton("Audio Recorder"   , base + "/QueuedInterpolation/audio_recorder/index.html", toolsPanel);
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   
    addButton("Texture Baking"       , base + "/get_baked/index.html", BlenderPanel);	
    addButton("Mesh Parenting"       , base + "/QueuedInterpolation/mesh_parent/index.html", BlenderPanel);	
    addButton("Multi-ShapeKey Groups"     , base + "/QueuedInterpolation/multi_shapekey_groups/index.html", BlenderPanel);	
    addButton("Skeleton Mocap" , base + "/QueuedInterpolation/armature/index.html", BlenderPanel);	
    addButton("Camera Animation"     , base + "/camera_anim/index.html", BlenderPanel);	
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -   	
    addButton("View Blog Repository"          , "https://github.com/Palmer-JC/Palmer-JC.github.io", topLevel);	
    addButton("Queued Interpolation Extension", "https://github.com/BabylonJS/Extensions/tree/master/QueuedInterpolation", topLevel);	
	
    return UIMesh;
};

var hyperlink = function(url){
    var link = window.document.createElement("a");
    link.href = url;
    var click = document.createEvent('MouseEvents');
    click.initEvent('click', true, false);
    link.dispatchEvent(click);
};