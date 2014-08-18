
/**
 * Components/generate.js
 *
 * Components fragment generation
 */

var DOM = Component.generate = Component.gen = function(html, parameters) {

	if ("string" != typeof html) {

		return document.createElement("div");

	}

	html = html.replace(/^\s+|\s+$/g, "");

	html = html.replace(/<(\w+?)( (.+?))?>/g,'<div tag-name="$1"$2>').replace(/<\/(.+?)>/g,'</div>');

	var element = document.createElement("div");
	element.innerHTML = html;

	var no_more_conpoment = false,
		loops = 0;

	while (!no_more_conpoment) {

		loops ++;

		if (loops > 1024) {

			console.error("Une boucle de création de component a été détéctée");

			no_more_conpoment = true;

		}
		
		var childs = child_node_list(element);

		for (var i = 0; i < childs.length; i++) {

			var child = childs[i];

			var tag_name = child.getAttribute("tag-name") || child.nodeName.replace("/", "").toLowerCase();

			if (Application.components[tag_name]) {

				var attributes = Component.attributes_parser(child.attributes, parameters);
				attributes._CHILDNODES_ = child.childNodes;

				var component = Application.components[tag_name].create(attributes);

				var element_created = component.firstChild;

				for (attribute in attributes) {

					if (attributes.hasOwnProperty(attribute) && element_created.getAttribute(attribute) === null && typeof attributes[attribute] === "string") {

						element_created.setAttribute(attribute, attributes[attribute]);

					}

				}

				child.parentNode.insertBefore(component, child);
				child.parentNode.removeChild(child);

				break;

			}

		}

		no_more_conpoment = true;

	}

	var fragment = document.createDocumentFragment();

	while (element.childNodes.length) {

		fragment.appendChild(element.childNodes[0]);

	}

	return fragment;

}