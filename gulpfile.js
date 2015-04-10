var gulp = require("gulp");
var gutil = require("gulp-util");

var fs = require("fs");
var path = require("path");

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

var watch = require("gulp-watch");
var rename = require("gulp-rename");

var sass = require("gulp-sass");
var minify = require("gulp-minify-css");
var autoprefixer = require("gulp-autoprefixer");
var csslint = require("gulp-csslint");

var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var react = require("gulp-react");
var webpack = require("webpack");
var jshint = require("gulp-jshint");

var browserSync = require("browser-sync");

var cssLintRuleBlackList = [
	
	"bulletproof-font-face",
	"adjoining-classes",
	"compatible-vendor-prefixes"

];

gulp.task("style", function () {

	return gulp.src("source/style/main.compiled.scss")
		.pipe(sass({

			errLogToConsole: true

		}))
		.pipe(rename("style.css"))
		.pipe(autoprefixer("last 2 versions", "> 1%", "Explorer 7", "Android 2"))
		.pipe(gulp.dest("assets/bin/"))

		.pipe(csslint())
		.pipe(csslint.reporter(function(file) {

			var errors = [];

			for (var i = 0, length = file.csslint.results.length; i < length; i++) {

				var error = file.csslint.results[i].error;
			
				if (typeof error.rule.id === "undefined" || cssLintRuleBlackList.indexOf(error.rule.id) < 0) {

					errors.push(error);

				}
			
			}

			if (errors.length) {

				console.log("\x1b[1m\x1b[5m\x1b[37m\x1b[41m" + errors.length + " CSSLINT ERRORS IN assets/style.css" + "\x1b[0m");

			}

			for (var i = 0, length = errors.length; i < length; i++) {
			
				var error = errors[i];

				if (error.line && cssLintRuleBlackList.indexOf(error.rule.id) < 0) {

					console.log("\x1b[1m\x1b[31m" + "Ligne " + error.line + " : " + error.message + "\x1b[0m");

				}

				else {

					console.log("\x1b[1m\x1b[31m" + "GENERAL : " + error.message + "\x1b[0m");

				}
			
			}

		}))

		.pipe(minify())
		.pipe(rename("style.min.css"))
		.pipe(gulp.dest("assets/bin/"))

		.pipe(browserSync.reload({ stream: true }));

});

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

			.pipe(jshint())
			.pipe(jshint.reporter(function(errors, cb) {

				if (errors.length) {

					console.log("\x1b[1m\x1b[5m\x1b[37m\x1b[41m" + errors.length + " JSHINT ERRORS IN assets/script.js" + "\x1b[0m");

				}

				for (var i = 0, length = errors.length; i < length; i++) {
				
					var error = errors[i].error;

					if (error.evidence) {

						console.log("\x1b[1m\x1b[31m" + "Ligne " + error.line + " : " + error.reason + " `" + error.evidence.trim() + "`" + "\x1b[0m");

					}

					else {

						console.log("\x1b[1m\x1b[31m" + "Ligne " + error.line + " : " + error.reason + "\x1b[0m");

					}
				
				}

			}))

			.pipe(uglify())
			.pipe(rename("script.min.js"))
			.pipe(gulp.dest("assets/bin/"))
			.pipe(browserSync.reload({ stream: true }));

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

gulp.task("cmi", function() {

	cmi.init({

		componentsFolder: "source/components",

		componentsImport: {

			from: "source/style/main.scss",
			to: "source/style/main.compiled.scss"

		}

	});

});

gulp.task("default", ["librairies", "scripts", "style", "cmi", "browser-sync"], function() {

	gulp.watch("assets/bin/librairies/**/*.js", ["librairies"]);
	
	watch(["source/core/**/*.*", "source/components/**/*.jsx", "source/components/**/*.js", "!source/components/*/model.*"], function() {

		gulp.start("scripts");

	});

	watch(["source/style/main.compiled.scss", "source/style/*/**.scss"], function() {

		gulp.start("style");

	});

});