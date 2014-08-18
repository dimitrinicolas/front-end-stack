
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

	element.childs = element.childNodes;
	element.parent = element.parentNode;
	element.clone = element.cloneNode;

	element.add = function(element) {

		return function(child) {

			if (child.nodeName === "#document-fragment") {

				var array = [],
					childs = child.childNodes,
					length = childs.length;

				for (var i = 0; i < length; i++) {

					element.appendChild(childs[0]);

					array.push(element.childNodes[element.childNodes.length - 1]);

				}

				return array;

			}

			else if (child.length) {

				for (var i = 0; i < child.length; i++) {
					
					var array = [],
						length = child.length;

					for (var i = 0; i < length; i++) {

						element.appendChild(child[0]);

						array.push(element.childNodes[element.childNodes.length - 1]);

					}

					return array;

				}

			}

			else {

				element.appendChild(child);

				return El(child);

			}
			
		}

	}(element);

	element.on = function(element) {

		return function(event, callback, binding) {

			on(element, event, callback, binding);

		}

	}(element);

	element.inner = function(element) {

		var inner_element = document.createElement("div");

		inner_element.setAttribute("tag-name", "_inner_");

		element.appendChild(inner_element);

		return element;

	};

	return element;

};

Application.Element = Element;

var El = Element;