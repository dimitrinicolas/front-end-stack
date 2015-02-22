var gulp = require("gulp"),
	gutil = require("gulp-util");

var fs = require("fs"),
	path = require("path");

if (fs.existsSync("./../dev.json")) {

	var devjson = require("./../dev.json");

}

else {

	var devjson = {

		"browserSyncProxy": "localhost:8080",
		"browserSyncProxyPort": "8080"

	};

}

var cmi = require("cmi");

var watch = require("gulp-watch"),
	rename = require("gulp-rename");

var sass = require("gulp-sass"),
	minify = require("gulp-minify-css");

var concat = require("gulp-concat"),
	uglify = require("gulp-uglify"),
	react = require("gulp-react"),
	webpack = require("webpack");

var browserSync = require("browser-sync");

gulp.task("style", function () {

	gulp.src("source/components/**/*.scss")
		.pipe(cmi.style("source/style/main.compiled.scss", "source/style/main.scss"))
		.pipe(gulp.dest(""))

	return gulp.src("source/style/main.compiled.scss")
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

	webpack({

		cache: true,
		entry: "./source/main.js",

		output: {

			path: path.join(__dirname, "assets/bin"),
			filename: "script.js"

		},

		externals: {

			"react": "React"
		
		},

		module: {

			loaders: [

				{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
				{ test: /\.js$/, loader: "jsx" }

			]

		},

		plugins: []

	}, function(error, stats) {

		if (error) {

			throw new gutil.PluginError("webpack:build", error);

		}

		gutil.log("[webpack:build]", stats.toString({

			colors: true

		}));

		gulp.src(["assets/bin/script.js"])
			.pipe(uglify())
			.pipe(rename("script.min.js"))
			.pipe(gulp.dest("assets/bin/"))
			.pipe(browserSync.reload({ stream: true }));

	});

});

gulp.task("cmi", function() {

	cmi.init({

		componentsFolder: "source/components"

	});

});

gulp.task("browser-sync", function() {

	if (devjson.browserSyncProxy && devjson.browserSyncProxyPort) {

		browserSync({

			proxy: devjson.browserSyncProxy,
			port: devjson.browserSyncProxyPort,
			logLevel: "info"

		}, function(error, bs) {

			console.log(bs.options.getIn(["urls", "local"]));

		});

	}

	else {

		console.info("No `browserSyncProxy` and/or `browserSyncProxyPort` defined in `dev.json`");

	}

});

gulp.task("default", ["scripts", "style", "cmi", "browser-sync"], function() {

	watch(["source/scripts/**/*.*", "source/components/**/*.jsx", "source/components/**/*.js", "!source/components/*/model.*"], function() {

		gulp.start("scripts");

	});

	watch(["source/style/**/*.scss", "source/components/**/*.scss"], function() {

		gulp.start("style");

	});

});