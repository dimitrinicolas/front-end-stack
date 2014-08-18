
/**
 * Core/on.js
 *
 * Add event to an element
 */

function on(element, event, callback) {

	if (event === "CLICK") {

		Application.onTap(element, callback);

	}

	else {

		if (typeof element.addEventListener !== "undefined") {

			element.addEventListener(event, callback, false);

		}

		else {

			element.attachEvent(event, callback);
			
		}

	}

	return element;

}