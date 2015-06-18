"use strict";

var gulp = require("gulp");

var config = require("./config.js");

var browserSync = require("browser-sync");

gulp.task("browser-sync", function() {
	if (config.browserSync) {

		browserSync({

			files: ["assets/bin/librairies.min.js", "assets/bin/script.js", "assets/bin/style.min.css"],

			proxy: config.browserSyncProxy,
			port: config.browserSyncProxyPort,
			logLevel: "info",
			logFileChanges: false

		}, function(error, bs) {

			console.log(bs.options.getIn(["urls", "local"]));

		});

	}
});