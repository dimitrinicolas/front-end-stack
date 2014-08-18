
/**
 * Element/main.js
 *
 * Element model
 */

function Element(name, settings) {

	if (this !== window) {

		var element = Element.create(name, settings);

	}

	else {

		var element = Element.select(name, settings);

	}

	element.add = element.appendChild;
	element.childs = element.childNodes;
	element.parent = element.parentNode;
	element.clone = element.cloneNode;

	element.on = function(element) {

		return function(event, callback) {

			on(element, event, callback);

		}

	}(element);

	element.inner = function(element) {

		var inner_element = document.createElement("div");

		inner_element.setAttribute("tag-name", "_inner_")

		element.appendChild(inner_element);

		return element;

	};

	return element;

};

Application.Element = Element;

var El = Element;