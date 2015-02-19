var fs = require("fs");
var path = require("path");

var through = require("through2");
var gutil = require("gulp-util");
var PluginError = gutil.PluginError;
var File = gutil.File;

const PLUGIN_NAME = "MarmWork compiler";

module.exports = {

	style: function(destination, from) {

		var content = "";
	
		var folder = path.join(__dirname, path.dirname(from)).replace("marmwork\\", "");

		return through.obj(function(file, enc, callback) {
	
			if (file.isBuffer()) {
	
				content += "@import \"" + path.relative(folder, file.path).replace(/\\/gi, "/") + "\"; \n";
	
			}
	
			callback(null, null);
	
		}, function(callback) {
	
			var main = new Buffer(from);
	
			fs.readFile(from, "utf-8", function(that, destination, content) {
	
				return function(error, result) {
	
					var file = new File(destination);
	
					file.contents = Buffer(result.replace("{{components}}", content));
					file.path = destination;
	
					that.push(file);
	
				}
	
			}(this, destination, content));
		
		});
	
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