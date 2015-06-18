"use strict";

var gulp = require("gulp");

var cmi = require("cmi");

gulp.task("cmi", function() {

	cmi.init({

		componentsFolder: "source/components",

		componentsImport: {

			from: "source/style/main.css",
			to: "source/style/main.compiled.css"

		}

	});

});