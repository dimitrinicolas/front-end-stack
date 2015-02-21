function htmlSecure(text) {

	return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

}

function viewComponents(components) {

	var componentsList = document.getElementById("components-list");

	componentsList.style.display = "";

	if (componentsList.className.indexOf("components-list--visible") < 0) {

		setTimeout(function() {

			componentsList.className += " components-list--visible";

		}, 10);

	}

	componentsList.innerHTML = "";

	for (var i = 0, length = components.length; i < length; i++) {
	
		var component = components[i];

		componentsList.innerHTML += "<h1>" + component.name + "</h1>";

		for (var j = 0, fileLength = component.files.length; j < fileLength; j++) {
		
			var file = component.files[j];

			console.log(file);
			componentsList.innerHTML += "<h3>" + file.name + "</h3>";
			componentsList.innerHTML += '<pre class="components-list__code">' + htmlSecure(file.content) + "</pre>";
		
		}
	
	}

}

function socketLoaded() {

	var socket = io.connect(location.protocol + "//" + location.hostname + ":" + (parseInt(location.port) + 1));
	
	var app = document.getElementById("app");

	var loader = document.getElementById("loader");
	loader.className += " loader--loaded";

	socket.emit("init", function(result) {

		console.log(result);

		viewComponents(result.components);

		setTimeout(function() {

			loader.parentNode.removeChild(loader);

		}, 400);

	});

	socket.on("update-components", function(components) {

		console.log(components);
		
		viewComponents(components);

	});

}