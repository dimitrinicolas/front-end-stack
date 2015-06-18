"use strict";

var gulp = require("gulp");

var postcss = require("gulp-postcss");
var rename = require("gulp-rename");
var merge = require("merge");
var minify = require("gulp-minify-css");

var browserSync = require("browser-sync");

gulp.task("style", function () {

	return gulp.src("source/style/main.compiled.css")

		.pipe(postcss([

			require("postcss-import"),
			require("postcss-mixins")({ mixinsDir: __dirname + "/../source/style/mixins/" }),
			require("postcss-simple-extend"),
			require("postcss-nested"),
			require("postcss-for"),
			require("postcss-each"),
			require("postcss-simple-vars")({
	
				variables: merge(require("../source/config/colors.js"),
				                 require("../source/config/breakpoints.js"),
				                 require("../source/config/sizes.js"))
	
			}),
			require("postcss-assets")({ relativeTo: "assets/bin/" }),
			require("postcss-calc")({ preserve: false }),
			require("postcss-size"),
			require("./postcss.js"),
			require("postcss-position"),
			require("postcss-will-change"),
			require("postcss-color-gray")(),
			require("postcss-color-rgba-fallback")(),
			require("postcss-image-set"),
			require("autoprefixer-core")({ browsers: ["last 1 version"] }),
			require("postcss-opacity"),
			require("postcss-pxtorem")({ replace: false }),
			require("postcss-color-function")(),
			require("postcss-merge-rules")()
	
		]))

		.pipe(rename("style.css"))
		.pipe(gulp.dest("assets/bin/"))

		.pipe(minify())
		.pipe(rename("style.min.css"))
		.pipe(gulp.dest("assets/bin/"))

		.pipe(browserSync.reload({ stream: true }));

});