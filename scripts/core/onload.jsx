
/**
 * core/onload.jsx
 *
 * DOM Content Loaded function
 */

Application.domLoadEventListeners = [];

function onload(callback) {

	if (typeof callback === "function") {

		Application.domLoadEventListeners.push(callback);

	}

}

Application.domContentLoaded = false;

Application.onDomContentLoaded = function(event) {

	if (!Application.domContentLoaded) {

		Application.domContentLoaded = true;

		for (var i = 0; i < Application.domLoadEventListeners.length; i++) {

			var fn = Application.domLoadEventListeners[i]

			if (typeof fn === "function") {

				fn();

			}
			
		}

	}

};

if (typeof document.addEventListener !== "undefined") {

	document.addEventListener("DOMContentLoaded", Application.onDomContentLoaded, false);

}

else {

	document.attachEvent("onDOMContentLoaded", Application.onDomContentLoaded);

}

if (typeof window.addEventListener !== "undefined") {

	window.addEventListener("load", Application.onDomContentLoaded, false);

}

else {

	window.attachEvent("onload", Application.onDomContentLoaded);

}

window.onload = function() {

    Application.onDomContentLoaded();

};