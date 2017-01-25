var scene;

var regDPS, regFPS;
var nClothsScroller;
var simdDPS, simdFPS;
var lgFont = 1;
var smaller = lgFont - .3;

function createDialog(sceneArg) {
	scene = sceneArg;
    DIALOG.DialogSys.initialize(scene);
    DIALOG.DialogSys.CURRENT_FONT_MAT_ARRAY = DIALOG.DialogSys.WHITE;
    DIALOG.LCD.MAT =DIALOG.DialogSys.BLUE[0];

    var topLevel = new DIALOG.Panel("Dock panel", DIALOG.Panel.LAYOUT_HORIZONTAL, true);
    topLevel.horizontalAlignment = DIALOG.Panel.ALIGN_HCENTER;
    topLevel.verticalAlignment   = DIALOG.Panel.ALIGN_TOP;
    topLevel.stretchHorizontal = true;

    var leftPanel = new DIALOG.Panel("left panel", DIALOG.Panel.LAYOUT_VERTICAL).horizontalAlign(DIALOG.Panel.ALIGN_LEFT);
    var settingsPanel = new DIALOG.Panel("settings panel", DIALOG.Panel.LAYOUT_HORIZONTAL).vertAlign(DIALOG.Panel.ALIGN_BOTTOM);
    nClothsScroller = new DIALOG.NumberScroller('# of Cloths:', 2, 1, 25, 5).vertAlign(DIALOG.Panel.ALIGN_BOTTOM);
    settingsPanel.addSubPanel(nClothsScroller);
    leftPanel.addSubPanel(settingsPanel);

    var simdChk = new DIALOG.CheckBox("SIMD").vertAlign(DIALOG.Panel.ALIGN_BOTTOM);
    simdChk.assignCallback(function(){
    });
    settingsPanel.addSubPanel(simdChk);

    var actionsPanel = new DIALOG.Panel("actions panel", DIALOG.Panel.LAYOUT_HORIZONTAL).vertAlign(DIALOG.Panel.ALIGN_BOTTOM);
    var runButton = new DIALOG.Button("Run").vertAlign(DIALOG.Panel.ALIGN_BOTTOM);
    runButton.assignCallback(function(){
    	queueAnimation(nClothsScroller.value, scene);
    });
    actionsPanel.addSubPanel(runButton);

    var pauseButton = new DIALOG.Button("Pause - Play").vertAlign(DIALOG.Panel.ALIGN_BOTTOM);
    pauseButton.assignCallback(function(){
    	if (POV.BeforeRenderer.isSystemPaused()) POV.BeforeRenderer.resumeSystem();
       	else POV.BeforeRenderer.pauseSystem();
    });
    actionsPanel.addSubPanel(pauseButton);

    var debugChk = new DIALOG.CheckBox("Debug Mode");
    debugChk.assignCallback(function(){
    	if (debugChk.isSelected())
            DIALOG.DialogSys._scene.debugLayer.show();
    	else
            DIALOG.DialogSys._scene.debugLayer.hide();
    });
    actionsPanel.addSubPanel(debugChk);
    leftPanel.addSubPanel(actionsPanel);
    
    topLevel.addSubPanel(leftPanel);
    // - - - - - - - - - - -
/*    var centerPanel = new DIALOG.Panel("left panel", DIALOG.Panel.LAYOUT_HORIZONTAL).vertAlign(DIALOG.Panel.ALIGN_BOTTOM);
    var simdChk = new DIALOG.CheckBox("SIMD").vertAlign(DIALOG.Panel.ALIGN_BOTTOM).setFontSize(smaller);
    simdChk.assignCallback(function(){
    });
    centerPanel.addSubPanel(simdChk);

    nClothsScroller = new DIALOG.NumberScroller('# of Cloths:', 2, 1, 25, 5).setSubsFaceSize(smaller).vertAlign(DIALOG.Panel.ALIGN_BOTTOM);
    centerPanel.addSubPanel(nClothsScroller);

    var runButton = new DIALOG.Button("Run").vertAlign(DIALOG.Panel.ALIGN_BOTTOM);
    runButton.assignCallback(function(){
    	queueAnimation();
    });
    centerPanel.addSubPanel(runButton);

    var pauseButton = new DIALOG.Button("Pause - Play").vertAlign(DIALOG.Panel.ALIGN_BOTTOM);
    pauseButton.assignCallback(function(){
    	if (POV.BeforeRenderer.isSystemPaused()) POV.BeforeRenderer.resumeSystem();
       	else POV.BeforeRenderer.pauseSystem();
    });
    centerPanel.addSubPanel(pauseButton);

    topLevel.addSubPanel(centerPanel);
    // - - - - - - - - - - -    */
    topLevel.addSubPanel(new DIALOG.Spacer(0, 12) );


    var rowStubPanel = new DIALOG.Panel("Row stub panel", DIALOG.Panel.LAYOUT_VERTICAL).horizontalAlign(DIALOG.Panel.ALIGN_RIGHT).stretch(true, false);
//    rowStubPanel.addSubPanel(new DIALOG.Spacer(.65, 0) );
    rowStubPanel.addSubPanel(new DIALOG.Label("DPS:"          ).horizontalAlign(DIALOG.Panel.ALIGN_RIGHT).vertAlign(DIALOG.Panel.ALIGN_BOTTOM) );
    rowStubPanel.addSubPanel(new DIALOG.Label("Potential FPS:").horizontalAlign(DIALOG.Panel.ALIGN_RIGHT).vertAlign(DIALOG.Panel.ALIGN_BOTTOM) );
    topLevel.addSubPanel(rowStubPanel);

    var regPanel = new DIALOG.Panel("Reg panel", DIALOG.Panel.LAYOUT_VERTICAL).horizontalAlign(DIALOG.Panel.ALIGN_RIGHT);
    regPanel.addSubPanel(new DIALOG.Label("Reg:" ).horizontalAlign(DIALOG.Panel.ALIGN_HCENTER).setLetterMaterial(DIALOG.DialogSys.GOLD) );
    regDPS = new DIALOG.LCD("regDPS", 2, false, 1).horizontalAlign(DIALOG.Panel.ALIGN_HCENTER);
    regDPS.value = 0;
    regPanel.addSubPanel(regDPS);
    regFPS = new DIALOG.LCD("regFPS", 2, false, 1).horizontalAlign(DIALOG.Panel.ALIGN_HCENTER);
    regFPS.value = 0;
    regPanel.addSubPanel(regFPS);
    topLevel.addSubPanel(regPanel);

    var simdPanel = new DIALOG.Panel("SIMD panel", DIALOG.Panel.LAYOUT_VERTICAL).horizontalAlign(DIALOG.Panel.ALIGN_RIGHT);
    simdPanel.addSubPanel(new DIALOG.Label("SIMD:" ).horizontalAlign(DIALOG.Panel.ALIGN_HCENTER).setLetterMaterial(DIALOG.DialogSys.GOLD) );
    simdDPS = new DIALOG.LCD("simdDPS", 2, false, 1).horizontalAlign(DIALOG.Panel.ALIGN_HCENTER);
    simdDPS.value = 0;
    simdPanel.addSubPanel(simdDPS);
    simdFPS = new DIALOG.LCD("simdFPS", 2, false, 1).horizontalAlign(DIALOG.Panel.ALIGN_HCENTER);
    simdFPS.value = 0;
    simdPanel.addSubPanel(simdFPS);
    topLevel.addSubPanel(simdPanel);

//    topLevel.setSubsFaceSize(0.7, true);
    topLevel.layout();
//    topLevel.maxViewportWidth  = 0.3;
//    topLevel.maxViewportHeight = 0.4;
    DIALOG.DialogSys.pushPanel(topLevel);
};

