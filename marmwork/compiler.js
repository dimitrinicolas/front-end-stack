var gulp = require("gulp"),
	watch = require("gulp-watch");

var fs = require("fs"),
	http = require("http"),
	path = require("path");

var through = require("through2"),
	gutil = require("gulp-util"),
	PluginError = gutil.PluginError,
	File = gutil.File,
	colors = require("colors");

var Component = require("./Component.js");

var marmwork = {

	components: [],

	init: function(config) {

		this.config = typeof config === "object" ? config : {};

		if (!this.config.port) {

			this.config.port = 5000;

		}

		this.io = require("socket.io")(this.config.port + 1);

		this.io.on("connection", function(marmwork) {
			return function(socket) {

				socket.on("init", function(marmwork) {
					return function(callback) {

						callback({
	
							components: marmwork.components
	
						});
	
					};
				}(marmwork));

			};
		}(this));

		this.updateComponents();
		this.watch(this.updateComponents);

		http.createServer(function(request, response) {

			if (request.url === "/") {

				var serverTemplate = fs.readFileSync(path.join(__dirname, "server.html"), "utf-8");

				response.writeHeader(200, { "Content-Type": "text/html" });
				response.write(serverTemplate);
				response.end();

			}

			else if (request.url === "/style.css") {

				var scriptTemplate = fs.readFileSync(path.join(__dirname, "style.css"), "utf-8");

				response.writeHeader(200, { "Content-Type": "text/css" });
				response.write(scriptTemplate);
				response.end();

			}

			else if (request.url === "/script.js") {

				var scriptTemplate = fs.readFileSync(path.join(__dirname, "script.js"), "utf-8");

				response.writeHeader(200, { "Content-Type": "application/javascript" });
				response.write(scriptTemplate);
				response.end();

			}

			else {

				response.end();

			}

		}).listen(this.config.port);

		console.log("   Access to the MarmWork dev server :".white);
		console.log(" ——————————————————————————————————————— ".grey);
		console.log(("      Local: http://localhost:" + this.config.port).white);
		console.log(("   External: http://192.168.1.2:" + this.config.port).white);
		console.log(" ——————————————————————————————————————— ".grey);

	},

	watch: function(callback) {

		watch(this.config.componentsFolder + "/**/*.*", function(marmwork, callback) {
			return function() {

				marmwork.updateComponents.call(marmwork);

			};
		}(this, callback));

	},

	updateComponents: function() {

		this.components = [];

		var list = fs.readdirSync(this.config.componentsFolder);

		for (var i = 0, maxI = list.length; i < maxI; i++) {

			var folderName = list[i];
		
			var packageJson = fs.readFileSync(this.config.componentsFolder + "/" + folderName + "/package.json", "utf-8");

			try {

				var componentId = this.components.length;

				this.components[componentId] = new Component(JSON.parse(packageJson));

				var name = packageJson.name;

				var jsList = fs.readdirSync(this.config.componentsFolder + "/" + folderName);

				for (var j = 0, maxJ = jsList.length; j < maxJ; j++) {

					var extname = path.extname(jsList[j]);

					if (extname === ".js" || extname === ".jsx") {

						var content = fs.readFileSync(this.config.componentsFolder + "/" + folderName + "/" + jsList[j], "utf-8");

						this.components[componentId].files.push({

							name: jsList[j],
							content: content

						});

					}

					if (i === maxI - 1 && j === maxJ - 1 && this.io) {

						this.io.sockets.emit("update-components", this.components);

					}

				}

			}

			catch (parseError) {

				console.error("Invalid package.json of " + folderName + " component:", parseError); 

			}

		}

	},

	style: function(destination, from) {

		var content = "";

		var folder = path.join(__dirname, path.dirname(from)).replace("marmwork\\", "");

		return through.obj(function(marmwork) {
			return function(file, enc, callback) {

				if (file.isBuffer()) {

					content += "@import \"" + path.relative(folder, file.path).replace(/\\/gi, "/") + "\"; \n";

				}

				callback(null, null);

			};
		}(this), function(marmwork) {
			return function(callback) {

				var main = new Buffer(from);

				fs.readFile(from, "utf-8", function(that, destination, content) {
					return function(error, result) {

						var file = new File(destination);

						file.contents = Buffer(result.replace("{{components}}", content));
						file.path = destination;

						that.push(file);

					}
				}(this, destination, content));
	
			};
		}(this));

	},

	models: function(destination) {

		/*var frontScript = require("../marmwork/front-script");

		var content = String(frontScript).replace(/^function \(\) \{/gi, "").replace(/\}$/gi, "");
		
		var folder = path.join(__dirname, path.dirname(destination)).replace("marmwork\\", "");

		return through.obj(function(file, enc, callback) {
		
			if (file.isBuffer()) {
		
				var model = require(path.relative(folder, file.path).replace(/\\/gi, "/").replace(/^\.\.\//gi, "").replace(".js", ""));
				content += "modules." + model.name + " = " + String(model.examples).replace(/;$/, "") + "();";
		
			}
		
			callback(null, null);
		
		}, function(callback) {
		
			var main = new Buffer(destination);
		
			fs.readFile(destination, "utf-8", function(that, destination, content) {
		
				return function(error, result) {

					var file = new File(destination);

					console.log(result + content);
		
					file.contents = Buffer(result + content);
					file.path = destination;
		
					that.push(file);
		
				}
		
			}(this, destination, content));
		
		});*/

	}

};

module.exports = marmwork;