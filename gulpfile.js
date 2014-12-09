var gulp = require("gulp");

var fs = require("fs");

if (fs.existsSync("./dev.json")) {

	var devjson = require("./dev.json")

}

else {

	var devjson = {};

}

var rename = require("gulp-rename");

var sass = require("gulp-sass"),
	minify = require("gulp-minify-css");

var concat = require("gulp-concat"),
	uglify = require("gulp-uglify"),
	react = require("gulp-react");

var browserSync = require("browser-sync");

gulp.task("style", function () {

	return gulp.src("style/main.scss")
		.pipe(sass({

			errLogToConsole: true

		}))
		.pipe(rename("style.css"))
		.pipe(gulp.dest("assets/bin/"))

		.pipe(minify())
		.pipe(rename("style.min.css"))
		.pipe(gulp.dest("assets/bin/"))

		.pipe(browserSync.reload({ stream: true }));

});

gulp.task("scripts", function () {

	return gulp.src([

			"scripts/intro.*",
			"scripts/main.*",

			"scripts/vendor/**/*.*",

			"scripts/core/**/*.*",

			"scripts/components/**/*.*",

			"scripts/scripts/*/main.*",
			"scripts/scripts/**/*.*",

			"scripts/**/*.*",
			"scripts/outro.*"

		])
		.pipe(concat("script.js"))
		.pipe(gulp.dest("assets/bin/"))

		.pipe(react({

			errLogToConsole: true

		}))
		.pipe(gulp.dest("assets/bin/"))

		.pipe(uglify())
		.pipe(rename("script.min.js"))
		.pipe(gulp.dest("assets/bin/"))

		.pipe(browserSync.reload({ stream: true }));

});

gulp.task("browser-sync", function() {

	if (devjson.browserSyncProxy) {

		browserSync({

			proxy: devjson.browserSyncProxy

		});

	}

	else {

		console.info("No `browserSyncProxy` defined in `dev.json`");

	}

});

gulp.task("default", ["scripts", "style", "browser-sync"], function() {

	gulp.watch("scripts/**/*.*", function() {

		gulp.run("scripts");

	});

	gulp.watch("style/**/*.scss", function() {

		gulp.run("style");

	});

});