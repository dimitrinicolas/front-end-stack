"use strict";

var gulp = require("gulp");
var gutil = require("gulp-util");

var path = require("path");
var webpack = require("webpack");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

var browserSync = require("browser-sync");

gulp.task("scripts", function () {

	webpack({

		cache: true,
		entry: "./source/main.js",

		output: {

			path: path.join(__dirname, "../assets/bin"),
			filename: "script.js"

		},

		externals: {

			"react": "React"

		},

		module: {
			loaders: [

				{ test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "jsx" },
				{ test: /\.(js|jsx)$/, exclude: /node_modules/, loader: require.resolve("babel-loader") },

			]
		},

		plugins: []

	}, function(error, stats) {

		if (error) {

			throw new gutil.PluginError("webpack:build", error);

		}

		gutil.log("[webpack:build]", stats.toString({ colors: true }));

		return gulp.src("assets/bin/scripts.js")

			.pipe(uglify())

			.pipe(rename("scripts.min.js"))
			.pipe(gulp.dest("assets/bin/"))

			.pipe(browserSync.reload({ stream: true }));

	});

});