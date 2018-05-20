function idle(mesh) {
	var milliDuration = Math.random() * (1900 - 1600) + 1600; // between 1900 & 1600 millis
	var pose = "idle-" + (Math.random() * (3 - 1) + 1).toFixed();
    
	var events = [
        new QI.PoseEvent(pose, milliDuration),
	    function() { idle(mesh); }
	];
	mesh.queueEventSeries(new QI.EventSeries(events, 1, 1, QI.PoseProcessor.INTERPOLATOR_GROUP_NAME));
}