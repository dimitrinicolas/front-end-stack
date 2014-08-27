module.exports = function(grunt) {

	grunt.initConfig({

		"concat": {

			dist: {

				src: [
				
					"scripts/intro.js",
					"scripts/main.js",

					"scripts/vendor/**/*.js",

					"scripts/core/**/*.js",

					"scripts/components/main.js",
					"scripts/components/*.js",
					"scripts/components/*/main.js",
					"scripts/components/**/*.js",

					"scripts/scripts/*/main.js",
					"scripts/scripts/**/*.js",

					"scripts/**/*.js",
					"scripts/outro.js"

				],

				dest: "bin/script.js",

			}

		},

		"uglify": {

			dist: {

				files: { "bin/script.min.js": [ "bin/script.js" ] }

			}

		},

		"sass": {

			dist: {

				files: { "bin/style.css": "styles/main.scss" }

			}

		},

		"cssmin": {

			dist: {

				files: { "bin/style.min.css": [ "bin/style.css" ] }

			}

		},

		"watch": {

			dist: {

  				files: [

  					"Gruntfile.js",
  					"scripts/**/*.js",
  					"styles/**/*.scss"

  				],

  				tasks: [

  					"scripts",
  					"styles"

  				],

  				options: { event: [ "all" ], }

  			}
  			
		}

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-cssmin");

	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask("default", ["scripts", "styles"]);

	grunt.registerTask("scripts", ["concat:dist", "uglify:dist"]);
	grunt.registerTask("styles", ["sass:dist", "cssmin:dist"]);

	grunt.registerTask("auto", ["watch:dist"]);

}