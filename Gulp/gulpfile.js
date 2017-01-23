var gulp  = require("gulp");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");

gulp.task('armature' ,function() {
	return gulp.src(["./scenes/QueuedInterpolation/armature/javascript/armature.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
});

gulp.task('boo' ,function() {
	return gulp.src(["./scenes/boo/javascript/boo.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
});

gulp.task('camera_anim' ,function() {
	return gulp.src(["./scenes/camera_anim/javascript/camera_anim.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
});

gulp.task('dead_baby' ,function() {
	return gulp.src(["./scenes/game_rig_tester/javascript/dead_baby.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
});

gulp.task('eye_model' ,function() {
	return gulp.src(["./scenes/eye_model/javascript/eye_model.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
});

gulp.task('female_runner' ,function() {
	return gulp.src(["./scenes/game_rig_tester/javascript/female_runner.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
});

gulp.task('finger_shapekeys' ,function() {
	return gulp.src(["./scenes/finger_shapekeys/javascript/finger_shapekeys.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
});

gulp.task('five_cube_emit' ,function() {
	return gulp.src(["./scenes/five_cube_emit/javascript/five_cube_emit.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
});

gulp.task('flying_carpet' ,function() {
	return gulp.src(["./scenes/flying_carpet/javascript/shape_key.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
});

gulp.task('get_baked' ,function() {
	return gulp.src(["./scenes/get_baked/javascript/get_baked.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
});

gulp.task('gus' ,function() {
	return gulp.src(["./scenes/whoopstopia/javascript/gus.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
});

gulp.task('landscape' ,function() {
	return gulp.src(["./scenes/whoopstopia/javascript/landscape.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
});

gulp.task('mesh_parent' ,function() {
	return gulp.src(["./scenes/mesh_parent/javascript/mesh_parent.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
});

gulp.task('meter_scaled' ,function() {
	return gulp.src(["./scenes/game_rig_tester/javascript/meter_scaled.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
});

gulp.task('multi_shapekey_groups' ,function() {
	return gulp.src(["./scenes/multi_shapekey_groups/javascript/multi_shapekey_groups.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
});

gulp.task('young_white_female' ,function() {
	return gulp.src(["./scenes/human_emotions/javascript/young_white_female.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
});

gulp.task('whoopsSign' ,function() {
	return gulp.src(["./scenes/whoopstopia/javascript/whoopsSign.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
});
