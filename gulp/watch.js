"use strict";

var gulp = require("gulp");

var watch = require("gulp-watch");

gulp.task("watch", function() {

	watch("assets/bin/librairies/**/*.js", function() {
		gulp.start("librairies");
	});
	
	watch(["source/**/*.js"], function() {
		gulp.start("scripts");
	});

	watch(["source/**/*.css", "source/config/**/*.js", "source/style/**/*.js", "!source/style/main.css", "assets/**/*.png", "assets/**/*.jpg"], function() {
		gulp.start("style");
	});

});