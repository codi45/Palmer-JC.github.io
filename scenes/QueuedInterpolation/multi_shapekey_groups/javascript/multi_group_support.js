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
	var reset = [new QI.VertexDeformation("LEFT"   ,"BUMP", ["BASIS"],  1, 0, [1]),
	             new QI.VertexDeformation("RIGHT"  ,"BUMP", ["BASIS"],  1, 0, [1]),
	             new QI.VertexDeformation("MIDDLE" ,"BUMP", ["BASIS"],  1, 0, [1]),
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
    /**
     * sub-class of ReferenceDeformation, where the referenceStateName is Fixed to "BASIS"
     * @param {string} shapeKeyGroupName -  Used by QI.Mesh to place in the correct ShapeKeyGroup queue(s).
     * @param {string} endStateName - Name of state key to deform to
     * @param {number} milliDuration - The number of milli seconds the deformation is to be completed in
     * @param {number} millisBefore - Fixed wait period, once a syncPartner (if any) is also ready (default 0)
     * @param {number} endStateRatio - ratio of the end state to be obtained from reference state: -1 (mirror) to 1 (default 1)
     * @param {Vector3} movePOV - Mesh movement relative to its current position/rotation to be performed at the same time (default null)
     *                  right-up-forward
     * @param {Vector3} rotatePOV - Incremental Mesh rotation to be performed at the same time (default null)
     *                  flipBack-twirlClockwise-tiltRight
     * @param {Pace} pace - Any Object with the function: getCompletionMilestone(currentDurationRatio) (default Pace.LINEAR)
     */
    //                                     Shape                               end-                                  flip back
    //                                     Key                     dur-        state                                 twirl clockwise
    //                                     Group          State    ation  wait ratio  right-up-forward               tilt right               pace
    var stretch      = [new QI.Deformation(group        ,"BUMP" ,  750,    0,   1.0), 
                        new QI.Deformation(group        ,"BUMP" ,  150,  100,   -.2)
                       ];
    
    var vibrate      = [new QI.Deformation(group        ,"BUMP" ,   75,    0,    .2), 
                        new QI.Deformation(group        ,"BUMP" ,   75,    0,   -.2),
                       ];
                     
	var reset        = [new QI.VertexDeformation(group  ,"BUMP", ["BASIS"],  50, 0, [1]),
                       ];
	
    plane.queueEventSeries(new QI.EventSeries(stretch));
    plane.queueEventSeries(new QI.EventSeries(vibrate, 3, 0.8));
    plane.queueEventSeries(new QI.EventSeries(reset));
}

function drumming() {
	var dur = 75;
	
	// note right "BUMP" is in the opposite direction of left "BUMP", so down is > 0
	var rightDown       = new QI.VertexDeformation("RIGHT", "BASIS", ["BUMP" ],  dur, 300, [ .2]); // starts too fast, & each subsequent down also needs to wait
   	var rightLastDown   = new QI.VertexDeformation("RIGHT", "BASIS", ["BUMP" ],  dur, 300, [ .2]); // in sync with left, but delay for it after both are started
	var rightUp         = new QI.VertexDeformation("RIGHT", "BASIS", ["BUMP" ],  dur,   0, [-.2]);
	var rightHorizontal = new QI.VertexDeformation("RIGHT", "BUMP" , ["BASIS"],  dur,   0, [  1]);
	var rightStall      = new QI.Stall            (200, "RIGHT");
	
   	var leftDown        = new QI.VertexDeformation("LEFT" , "BASIS", ["BUMP" ],  dur,   0, [-.2]);
   	var leftUp          = new QI.VertexDeformation("LEFT" , "BASIS", ["BUMP" ],  dur,   0, [ .2]);
	var leftHorizontal  = new QI.VertexDeformation("LEFT" , "BUMP" , ["BASIS"],  dur,   0, [  1]);
   	
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
   	var series = [new QI.Deformation("MIDDLE", "BUMP",  500, 1600,  1.0),
   	              new QI.Deformation("RIGHT" , "BUMP",  500,    0,  1.0),
   	              new QI.Deformation("LEFT"  , "BUMP",  500,    0,  1.0),
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
