"use strict";

var gulp = require("gulp");

var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

var browserSync = require("browser-sync");

gulp.task("librairies", function () {

	return gulp.src([

			"assets/bin/librairies/es5-shim.min.js",
			"assets/bin/librairies/es5-sham.min.js",
			"assets/bin/librairies/react-with-addons.min.js",

			"assets/bin/librairies/**/*.js"

		])

		.pipe(concat("librairies.js"))

		.pipe(uglify())

		.pipe(rename("librairies.min.js"))
		.pipe(gulp.dest("assets/bin/"))

		.pipe(browserSync.reload({ stream: true }));

});