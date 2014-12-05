#!/usr/bin/env node

var program = require("commander"),
	fs = require("fs"),
	prompt = require("prompt");

program
    .version("0.0.1")
    .parse(process.argv);

var data = {};

function capitaliseFirstLetter(string) {

	return string.charAt(0).toUpperCase() + string.slice(1);

}

if (fs.existsSync("package.json")) {

	var result = fs.readFileSync("package.json", {

		encoding: "utf8"

	});

	var pjson = JSON.parse(result);

	if (!pjson.componentManagerStyle) {

		throw "No componentManagerStyle in package.json";

	}

	else if (!fs.existsSync(pjson.componentManagerStyle)) {

		throw "The file " + pjson.componentManagerStyle + " don't exist";

	}

	else {

		data.scss = pjson.componentManagerStyle;
		data.components = pjson.componentManagerStyle.replace(/[^\/]*$/, "components/");

	}

}

else {

	throw "No package.json";

}

var cm = {

	create: function(name, subs) {

		console.info("create component", name);

		if (!fs.existsSync(data.components + name)){

			fs.mkdirSync(data.components + name);

			var file = "\r\n/**\r\n * components/" + name + "/" + name + ".scss\r\n *\r\n * " + capitaliseFirstLetter(name) + "\r\n */\r\n\r\n." + name + " {\r\n\r\n\t\r\n\r\n}";

			fs.writeFileSync(data.components + name + "/" + name + ".scss", file, { encoding: "utf8" });

			if (subs && subs.length > 0) {

				for (var i = 0, length = subs.length; i < length; i++) {
				
					var sub = subs[i];

					var file = "\r\n/**\r\n * components/" + name + "/" + sub + ".scss\r\n *\r\n * " + capitaliseFirstLetter(name) + " " + sub + "\r\n */\r\n\r\n." + name + "__" + sub + " {\r\n\r\n\t\r\n\r\n}";

					fs.writeFileSync(data.components + name + "/" + sub + ".scss", file, { encoding: "utf8" });
				
				}

			}

			var scss = fs.readFileSync(data.scss, {

				encoding: "utf8"

			});

			scss += "\r\n";
			scss += '\r\n@import "components/' + name + '/' + name + '";';

			if (subs && subs.length > 0) {

				for (var i = 0, length = subs.length; i < length; i++) {
				
					var sub = subs[i];

					scss += '\r\n@import "components/' + name + '/' + sub + '";';
				
				}

			}

			fs.writeFileSync(data.scss, scss, { encoding: "utf8" });


		}

		else {

			throw "Folder already exist";

		}

	}

};

if (!program.args.length) {

	// askForCommand();

	console.log("{ask for something}");

}

else if (program.args.length < 2) {

	// askForCommand();

	console.log("{ask for something}");

}

else if (program.args[0] === "create") {

	var subs = [];

	if (program.args.length > 2) {

		for (var i = 2, length = program.args.length; i < length; i++) {
		
			subs.push(program.args[i]);
		
		}

	}

	cm.create(program.args[1], subs);

}

else {

	console.log("unknown command");

}