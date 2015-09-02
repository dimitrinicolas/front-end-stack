"use strict";

var config = require("../config.json");

var gulp = require("gulp");

var cmi = require("cmi");

gulp.task("cmi", function() {

	cmi.init({

		port: config.cmiPort,
		componentsFolder: "source/components",

		componentsImport: {

			from: "source/style/main.css",
			to: "source/style/main.compiled.css"

		}

	});

});