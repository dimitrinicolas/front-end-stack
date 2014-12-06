module.exports = function(grunt) {

	grunt.initConfig({

		devjson: grunt.file.readJSON("dev.json"),

		"concat": {

			scripts: {

				src: [
				
					"scripts/intro.*",
					"scripts/main.*",

					"scripts/vendor/**/*.*",

					"scripts/core/**/*.*",

					"scripts/components/**/*.*",

					"scripts/scripts/*/main.*",
					"scripts/scripts/**/*.*",

					"scripts/**/*.*",
					"scripts/outro.*"

				],

				dest: "assets/bin/script.jsx"

			}

		},

		"react": {

			dist: {

				files: { "assets/bin/script.js": "assets/bin/script.jsx" }

			}

		},

		"uglify": {

			dist: {

				files: { "assets/bin/script.min.js": [ "assets/bin/script.js" ] }

			}

		},

		"sass": {

			dist: {

				files: { "assets/bin/style.css": "style/main.scss" }

			}

		},

		"cssmin": {

			dist: {

				files: { "assets/bin/style.min.css": [ "assets/bin/style.css" ] }

			}

		},

		"concurrent": {

			auto: ["browserSync", "auto-scripts", "auto-style"],

			options: {

				logConcurrentOutput: true

			}

		},

		"watch": {

			scripts: {

				files: [

					"Gruntfile.js",
					"scripts/**/*.*"

				],

				tasks: [ "scripts" ],

				options: { event: [ "all" ], }

			},
			
			style: {

				files: [

					"Gruntfile.js",
					"style/**/*.scss"

				],

				tasks: [ "style" ],

				options: { event: [ "all" ], }

			}
			  			

		},

		"browserSync": {

			bsFiles: {

				src: [

					"assets/bin/*.*"

				]

			},

			options: {

				proxy: "<%= devjson.browserSyncProxy %>"

			}

		}

	});

	// NODE PACKAGES

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-react");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.loadNpmTasks("grunt-sass");
	grunt.loadNpmTasks("grunt-contrib-cssmin");

	grunt.loadNpmTasks("grunt-concurrent");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.loadNpmTasks("grunt-browser-sync");

	// GRUNT TASKS

	grunt.registerTask("default", ["scripts", "style"]);

	grunt.registerTask("scripts", ["concat:scripts", "react:dist", "uglify:dist"]);
	grunt.registerTask("style", ["sass:dist", "cssmin:dist"]);

	grunt.registerTask("auto", ["concurrent:auto"]);
	grunt.registerTask("auto-scripts", ["watch:scripts"]);
	grunt.registerTask("auto-style", ["watch:style"]);

	grunt.registerTask("dev", ["auto"]);
	grunt.registerTask("d", ["auto"]);

}