/**
 *  called by multi_group.html
 */

var plane;
function prep(scene){
	plane = scene.getMeshByID("Plane");
	plane.debug = true;

	// pretty important when there are multiple groups moving at the same time to pre-define your keys
	var leftGrp = plane.getShapeKeyGroup("LEFT");
	leftGrp.mirrorAxisOnY();   // mirror on Y, so bump can also be a depression, using negative end state ratios
	leftGrp.addDerivedKey("BASIS", "BUMP", -.2);
	leftGrp.addDerivedKey("BASIS", "BUMP",  .2);

	var middleGrp = plane.getShapeKeyGroup("MIDDLE");
	middleGrp.mirrorAxisOnY(); // mirror on Y, so bump can also be a depression, using negative end state ratios
	middleGrp.addDerivedKey("BASIS", "BUMP", -.2);
	middleGrp.addDerivedKey("BASIS", "BUMP",  .2);

	var rightGrp = plane.getShapeKeyGroup("RIGHT");
	rightGrp.mirrorAxisOnY();  // mirror on Y, so bump can also be a depression, using negative end state ratios
	rightGrp.addDerivedKey("BASIS", "BUMP", -.2);
	rightGrp.addDerivedKey("BASIS", "BUMP",  .2);

	// testing of AutomatonEventSeriesAction, trigger on a pick
	var reset = [new QI.BasisReturn("LEFT"   , 1),
	             new QI.BasisReturn("RIGHT"  , 1),
	             new QI.BasisReturn("MIDDLE" , 1),
	             ];
	var resetSeries = new QI.EventSeries(reset);
	var resetAction = new QI.SeriesAction(BABYLON.ActionManager.OnPickTrigger, plane, resetSeries);
	
	plane.actionManager = new BABYLON.ActionManager(scene);
	plane.actionManager.registerAction(resetAction);

}

function left() {
	boing("LEFT");
}

function middle() {
	boing("MIDDLE");
}

function right() {
	boing("RIGHT");
}

function boing(group){
    var stretch      = [new QI.Deformation(group        ,"BUMP" ,   1.0,  750),
                        new QI.Deformation(group        ,"BUMP" ,   -.2,  150, null, null, { millisBefore : 100 })
                       ];
    
    var vibrate      = [new QI.Deformation(group        ,"BUMP" ,    .2,   75),
                        new QI.Deformation(group        ,"BUMP" ,   -.2,   75),
                       ];
                     
	var reset        = [new QI.BasisReturn(group  ,50),
                       ];

    plane.queueEventSeries(new QI.EventSeries(stretch));
    plane.queueEventSeries(new QI.EventSeries(vibrate, 3, 0.8));
    plane.queueEventSeries(new QI.EventSeries(reset));
}

function drumming() {
	var dur = 75;

	// note right "BUMP" is in the opposite direction of left "BUMP", so down is > 0
	var rightDown       = new QI.VertexDeformation("RIGHT", "BASIS", ["BUMP" ], [ .2],  dur, null, null, { millisBefore : 300 }); // starts too fast, & each subsequent down also needs to wait
   	var rightLastDown   = new QI.VertexDeformation("RIGHT", "BASIS", ["BUMP" ], [ .2],  dur, null, null, { millisBefore : 100 }); // in sync with left, but delay for it after both are started
	var rightUp         = new QI.VertexDeformation("RIGHT", "BASIS", ["BUMP" ], [-.2],  dur);
	var rightHorizontal = new QI.VertexDeformation("RIGHT", "BUMP" , ["BASIS"], [  1],  dur);
	var rightStall      = new QI.Stall(200, "RIGHT");
	
   	var leftDown        = new QI.VertexDeformation("LEFT" , "BASIS", ["BUMP" ], [-.2],  dur);
   	var leftUp          = new QI.VertexDeformation("LEFT" , "BASIS", ["BUMP" ], [ .2],  dur);
	var leftHorizontal  = new QI.VertexDeformation("LEFT" , "BUMP" , ["BASIS"], [  1],  dur);

   	// make last down beats a sync pair
   	leftDown     .setSyncPartner(rightLastDown);
   	rightLastDown.setSyncPartner(leftDown     );
   	
   	var series = [
   	              // even though left is first in the series, sync will delay all lefts till rightLastDown is ready
                  leftDown     , leftUp , leftHorizontal,
   	              
                  rightDown    , rightUp, rightHorizontal,
                  rightDown    , rightUp, rightHorizontal,
                  rightDown    , rightUp, rightHorizontal,
                  rightLastDown, rightUp, rightHorizontal, rightStall
   	             ];

    plane.queueEventSeries(new QI.EventSeries(series, 3));
}

function conflict() {
	              // all three start at the same time, use delays for demo
   	var series = [new QI.Deformation("MIDDLE", "BUMP",  1.0,  500, null, null, { millisBefore : 1600 }),
   	              new QI.Deformation("RIGHT" , "BUMP",  1.0,  500),
   	              new QI.Deformation("LEFT"  , "BUMP",  1.0,  500),
   	              // functions and Actions run on the queue of the first series, in this case 'MIDDLE'
                  function(){
                      window.alert("Overlapping Shape Key Groups can exist, but it is up to the application programmer to manage, unlike here.\n\nAction test:  Pick mesh to reset");
                  } 
   	             ];

    plane.queueEventSeries(new QI.EventSeries(series, 1, 1, "MIDDLE"));
}

function pausePlay() {
	console.log("Requesting " + (QI.TimelineControl.isSystemPaused ? "resume" : "pause"));
	// test system wide pause-play
	if (QI.TimelineControl.isSystemPaused) QI.TimelineControl.resumeSystem();
   	else QI.TimelineControl.pauseSystem();
}
