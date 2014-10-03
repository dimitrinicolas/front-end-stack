module.exports = function(grunt) {

	grunt.initConfig({

		"concat": {

			scripts: {

				src: [
				
					"scripts/intro.*",
					"scripts/main.*",

					"scripts/vendor/**/*.*",

					"scripts/core/**/*.*",

					"scripts/components/main.*",
					"scripts/components/*.*",
					"scripts/components/*/main.*",
					"scripts/components/**/*.*",

					"scripts/scripts/*/main.*",
					"scripts/scripts/**/*.*",

					"scripts/**/*.*",
					"scripts/outro.*"

				],

				dest: "bin/script.jsx"

			},

			server: {

				src: [
				
					"server/sources/core/node-modules.js",
					"server/sources/core/main.js",
					"server/sources/core/**/*.js",
					
					"server/sources/modules/*/main.js",
					"server/sources/modules/*/**/*.js",
					
					"server/sources/actions/intro.js",
					"server/sources/actions/*/**/*.js",
					"server/sources/actions/outro.js",
					
					"server/sources/outro.js"

				],

				dest: "server/bin/server.js"

			}

		},

		"react": {

			dist: {

				files: { "bin/script.js": "bin/script.jsx" }

			}

		},

		"uglify": {

			dist: {

				files: { "bin/script.min.js": [ "bin/script.js" ] }

			}

		},

		"nodemon": {

			dev: {

				script: "server/bin/server.js"

			}

		},

		"sass": {

			dist: {

				files: { "bin/style.css": "style/main.scss" }

			}

		},

		"cssmin": {

			dist: {

				files: { "bin/style.min.css": [ "bin/style.css" ] }

			}

		},

		"concurrent": {

			auto: ["auto-node", "auto-server", "auto-scripts", "auto-style"],

			options: {

				logConcurrentOutput: true

			}

		},

		"watch": {

			server: {

				files: [

					"Gruntfile.js",
					"server/sources/**/*.js"

				],

				tasks: [ "server" ],

				options: { event: ["all"], }

			},

			scripts: {

				files: [

					"Gruntfile.js",
					"scripts/**/*.jsx"

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
			  			

		}

	});

	// NODE PACKAGES

	grunt.loadNpmTasks("grunt-nodemon");

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-react");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-cssmin");

	grunt.loadNpmTasks("grunt-concurrent");
	grunt.loadNpmTasks("grunt-contrib-watch");

	// GRUNT TASKS

	grunt.registerTask("default", ["server", "scripts", "style"]);

	grunt.registerTask("server", ["concat:server"]);
	grunt.registerTask("scripts", ["concat:scripts", "react:dist", "uglify:dist"]);
	grunt.registerTask("style", ["sass:dist", "cssmin:dist"]);

	grunt.registerTask("auto", ["concurrent:auto"]);
	grunt.registerTask("auto-node", ["nodemon:dev"]);
	grunt.registerTask("auto-server", ["watch:server"]);
	grunt.registerTask("auto-scripts", ["watch:scripts"]);
	grunt.registerTask("auto-style", ["watch:style"]);

	grunt.registerTask("dev", ["auto"]);
	grunt.registerTask("d", ["auto"]);

}