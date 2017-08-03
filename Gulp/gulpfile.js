var gulp  = require("gulp");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var optimisejs = require('gulp-optimize-js');

var path;

gulp.task('armature' ,function() {
	path = "../scenes/QueuedInterpolation/armature/javascript";
	return gulp.src([path + "/armature.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
        .pipe(optimisejs())
        .pipe(gulp.dest(path));
});

gulp.task('butterfly' ,function() {
	path = "../scenes/blow_me_baby/javascript";
	return gulp.src([path + "/butterfly.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
        .pipe(optimisejs())
        .pipe(gulp.dest(path));
});

gulp.task('camera_anim' ,function() {
	path = "../scenes/camera_anim/javascript";
	return gulp.src([path + "/camera_anim.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
        .pipe(optimisejs())
        .pipe(gulp.dest(path));
});

gulp.task('dead_baby' ,function() {
	path = "../characters/javascript";
	return gulp.src([path + "/deadBaby.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
        .pipe(optimisejs())
        .pipe(gulp.dest(path));
});

gulp.task('dead_babyBust' ,function() {
	path = "../characters/javascript";
	return gulp.src([path + "/deadBabyBust.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
        .pipe(optimisejs())
        .pipe(gulp.dest(path));
});

gulp.task('eye_model' ,function() {
	path = "../scenes/abandoned/eye_model/javascript";
	return gulp.src([path + "/eye_model.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
        .pipe(optimisejs())
        .pipe(gulp.dest(path));
});

gulp.task('exact_scale_model' ,function() {
	path = "../scenes/QueuedInterpolation/game_rig_tester/javascript";
	return gulp.src([path + "/exact_scale.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
        .pipe(optimisejs())
        .pipe(gulp.dest(path));
});

gulp.task('female_runner' ,function() {
	path = "../scenes/QueuedInterpolation/game_rig_tester/javascript";
	return gulp.src([path + "/female_runner.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
        .pipe(optimisejs())
        .pipe(gulp.dest(path));
});

gulp.task('finger_model' ,function() {
	path = "../scenes/QueuedInterpolation/finger_shapekeys/javascript";
	return gulp.src([path + "/finger_model.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
        .pipe(optimisejs())
        .pipe(gulp.dest(path));
});

gulp.task('flying_carpet' ,function() {
	path = "../scenes/QueuedInterpolation/flying_carpet/javascript";
	return gulp.src([path + "/shape_key.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
        .pipe(optimisejs())
        .pipe(gulp.dest(path));
});

gulp.task('get_baked' ,function() {
	path = "../scenes/get_baked/javascript";
	return gulp.src([path + "/get_baked.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
        .pipe(optimisejs())
        .pipe(gulp.dest(path));
});

gulp.task('gus' ,function() {
	path = "../scenes/whoopstopia/javascript";
	return gulp.src([path + "/gus.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
        .pipe(optimisejs())
        .pipe(gulp.dest(path));
});

gulp.task('landscape' ,function() {
	path = "../scenes/whoopstopia/javascript";
	return gulp.src([path + "/landscape.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
        .pipe(optimisejs())
        .pipe(gulp.dest(path));
});

gulp.task('Nate' ,function() {
	path = "../characters/javascript";
	return gulp.src([path + "/Nate.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
        .pipe(optimisejs())
        .pipe(gulp.dest(path));
});

gulp.task('NateBust' ,function() {
	path = "../characters/javascript";
	return gulp.src([path + "/NateBust.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
        .pipe(optimisejs())
        .pipe(gulp.dest(path));
});

gulp.task('owm' ,function() {
	path = "../characters/javascript";
	return gulp.src([path + "/owm.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
        .pipe(optimisejs())
        .pipe(gulp.dest(path));
});

gulp.task('owmBust' ,function() {
	path = "../characters/javascript";
	return gulp.src([path + "/owmBust.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
        .pipe(optimisejs())
        .pipe(gulp.dest(path));
});

gulp.task('mesh_parent' ,function() {
	path = "../scenes/QueuedInterpolation/mesh_parent/javascript";
	return gulp.src([path + "/mesh_parent.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
        .pipe(optimisejs())
        .pipe(gulp.dest(path));
});

gulp.task('meter_scaled' ,function() {
	path = "../scenes/QueuedInterpolation/game_rig_tester/javascript";
	return gulp.src([path + "/meter_scaled.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
        .pipe(optimisejs())
        .pipe(gulp.dest(path));
});

gulp.task('multi_group' ,function() {
	path = "../scenes/QueuedInterpolation/multi_shapekey_groups/javascript";
	return gulp.src([path + "/multi_group.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
        .pipe(optimisejs())
        .pipe(gulp.dest(path));
});

gulp.task('woman' ,function() {
	path = "../characters/javascript";
	return gulp.src([path + "/woman.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
        .pipe(optimisejs())
        .pipe(gulp.dest(path));
});

gulp.task('womanBust' ,function() {
	path = "../characters/javascript";
	return gulp.src([path + "/womanBust.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
        .pipe(optimisejs())
        .pipe(gulp.dest(path));
});

gulp.task('whoopsSign' ,function() {
	path = "../scenes/whoopstopia/javascript";
	return gulp.src([path + "/whoopsSign.js"])
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
        .pipe(optimisejs())
        .pipe(gulp.dest(path));
});
