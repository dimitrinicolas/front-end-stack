(function(win, doc){

var window = win,
	document = doc;

/**
 * main.js
 *
 * Fichier JavaScript principal.
 */

var Application = {

	name: "MarmWork"

};

/**
 * Core/$.js
 *
 * DOM Content Loaded function
 */

Application.dom_load_event_listeners = [];

function $(callback) {

	if (typeof callback === "function") {

		Application.dom_load_event_listeners.push(callback);

	}

}

Application.dom_content_loaded = false;

Application.on_dom_content_loaded = function(event) {

	if (!Application.dom_content_loaded) {

		Application.dom_content_loaded = true;

		for (var i = 0; i < Application.dom_load_event_listeners.length; i++) {

			var fn = Application.dom_load_event_listeners[i]

			if (typeof fn === "function") {

				fn();

			}
			
		}

	}

};

on(document, "DOMContentLoaded", Application.on_dom_content_loaded);
on(window, "load", Application.on_dom_content_loaded);

window.onload = function() {

    Application.on_dom_content_loaded();

};

/**
 * Core/child-node-list.js
 *
 * Generate a list of childs of an element
 */

function child_node_list(element) {

	var array = [];

	for (var i = 0; i < element.childNodes.length; i++) {

		array.push(element.childNodes[i]);

		if (element.childNodes[i].childNodes) {

			var sub_childs = child_node_list(element.childNodes[i]);

			for (var c = 0; c < sub_childs.length; c++) {

				array.push(sub_childs[c]);

			}

		}

	}

	return array;

}

/**
 * Core/complete-vars.js
 *
 * Completer une chaine de caractère avec une variable objet
 */

function complete_vars(query, object, path) {

    add = path ? path + '.' : '';

    if (object instanceof Array) {

        for (var id = 0, length = object.length; id < length; id++) {

            query = object[id] instanceof Object ? query.complete(object[id], add + id) : query.replace('${' + add + id + '}', object[id]);

        }

    }

    else if (object instanceof Object) {

        for (var id in object) {

            query = object.hasOwnProperty(id) && object[id] instanceof Object ? query.complete(object[id], add + id) : query.replace('${' + add + id + '}', object[id]);

        }

    }

    return query;

}

/*
 *  Marmottajax 1.0.4
 *  Envoyer et recevoir des informations simplement en JavaScript
 */

var marmottajax = function(options) {

    return marmottajax.get(options);

};

marmottajax.normalize = function(parameters) {

    return parameters ? typeof parameters === "string" ? { url: parameters } : parameters : null;

};

marmottajax.json = function(parameters) {

    if (parameters = marmottajax.normalize(parameters)) {

        parameters.json = true;

        return new marmottajax.request(parameters);

    }

};

marmottajax.get = function(options) {

    return new marmottajax.request(options);

};

marmottajax.post = function(parameters) {

    if (parameters = marmottajax.normalize(parameters)) {

        parameters.method = "POST";

        return new marmottajax.request(parameters);

    }

};

marmottajax.put = function(parameters) {

    if (parameters = marmottajax.normalize(parameters)) {

        parameters.method = "PUT";

        return new marmottajax.request(parameters);

    }

};

marmottajax.delete = function(parameters) {

    if (parameters = marmottajax.normalize(parameters)) {

        parameters.method = "DELETE";

        return new marmottajax.request(parameters);

    }

};

marmottajax.request = function(options) {

    if (!options) { return false; }

    if (typeof options === "string") {

        options = { url: options };

    }

    if (options.method === "POST" || options.method === "PUT" || options.method === "DELETE") {

        var post = "?";

        for (var key in options.options) {

            post += options.options.hasOwnProperty(key) ? "&" + key + "=" + options.options[key] : "";

        }

    }

    else {

        options.method = "GET";

        options.url += options.url.indexOf("?") < 0 ? "?" : "";

        for (var key in options.options) {

            options.url += options.options.hasOwnProperty(key) ? "&" + key + "=" + options.options[key] : "";

        }

    }

    this.xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    this.xhr.options = options;

    this.xhr.callbacks = {

        then: [],
        error: []

    };

    this.then = function(callback) {

        this.xhr.callbacks.then.push(callback);

        return this;

    };

    this.error = function(callback) {

        this.xhr.callbacks.error.push(callback);

        return this;

    };

    this.xhr.call = function(categorie, result) {

        for (var i = 0; i < this.callbacks[categorie].length; i++) {

            if (typeof(this.callbacks[categorie][i]) === "function") {

                this.callbacks[categorie][i](result);

            }

        }

    };

    this.xhr.onreadystatechange = function() {

        if (this.readyState === 4 && this.status == 200) {

            var result = this.responseText;

            if (this.options.json) {

                try {

                    result = JSON.parse(result);

                }

                catch (error) {

                    this.call("error", "invalid json");

                    return false;

                }

            }

            this.call("then", result);

        }

        else if (this.readyState === 4 && this.status == 404) {

            this.call("error", "404");

        }

        else if (this.readyState === 4) {

            this.call("error", "unknow");

        }

    };

    this.xhr.open(options.method, options.url, true);
    this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    this.xhr.send(typeof post != "undefined" ? post : null);

};

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

/**
 * Core/tap.js
 *
 * Tap event
 */

Application.onTapEventsList = [];

Application.onTap = function(element, callback) {

	var eventListener = new Application.onTapObject(element, callback);
	
	Application.onTapEventsList.push(eventListener);

};

Application.onTapObject = function(element, callback) {

	this.callback = callback;
	this.element = element;

	this.touchstart = function(eventListener) {

		return function(event) {

			eventListener.moved = false;

			eventListener.startX = event.touches[0].clientX;
			eventListener.startY = event.touches[0].clientY;

		}

	}(this);

	this.touchmove = function(eventListener) {

		return function(event) {

			if (Math.abs(event.touches[0].clientX - eventListener.startX) > 10 || Math.abs(event.touches[0].clientY - eventListener.startY) > 10) {
			    
			    eventListener.moved = true;

			}

		}

	}(this);

	this.touchend = function(eventListener) {

		return function(event) {

			if (!eventListener.moved) {

				eventListener.callback(event);

			}

		}

	}(this);

	on(this.element, "touchstart", this.touchstart);
	on(this.element, "touchmove", this.touchmove);
	on(this.element, "touchend", this.touchend);
	on(this.element, "touchcancel", this.touchend);

	on(this.element, "click", function(eventListener) {

		return function(event) {

	        if (!("ontouchstart" in window)) {

	            eventListener.callback(event);

	        }

	    };

	}(this));

};

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

/**
 * Element/create.js
 *
 * Element create
 */

Element.create = function(name, settings) {

	var element,
		tag_name = /\w+/.exec(name)[0];

	if (Application.components[tag_name]) {

		var attributes = typeof settings === "object" ? settings : {};

		var component = Application.components[tag_name].create(attributes);

		child.parentNode.insertBefore(component, child);
		child.parentNode.removeChild(child);

	}

	else {

		element = document.createElement(tag_name);

	}

	var class_name = /([a-z-_]+)(\.([a-z-_]+))/i.exec(name);

	if (class_name) {

		element.className = class_name[3];

	}

	var id = /([a-z-_]+)(#([a-z-_]+))/i.exec(name);

	if (id) {

		element.id = id[3];

	}

	return element;

};

/**
 * Element/select.js
 *
 * Element select
 */

Element.select = function(name, settings) {

	var element;

	if (typeof name !== "string") {

		element = name;

	}

	else if (name[0] == "#") {

		element = document.getElementById(name.substring(1)) || new El("div");

	}
	
	return element;

};

/**
 * Components/main.js
 *
 * Component model
 */

Application.components = {};

function Component(name) {

	this.name = name;

	Application.components[name] = this;

};

var Co = Component;

Application.Component = Component;

/**
 * Components/attributes.js
 *
 * Transform attributes in an object
 */

Component.attributes_parser = function(attributes, parameters) {

	var result = {};

	for (var i = 0; i < attributes.length; i++) {

		result[attributes[i].name] = attributes[i].value;

		if (typeof attributes[i].value === "string" && attributes[i].value[0] == "$" && parameters) {

			for (parameter in parameters) {

				if (attributes[i].value === "${" + parameter + "}" && parameters.hasOwnProperty(parameter)) {

					result[attributes[i].name] = parameters[parameter];

				}

			}

		}
		
	}

	return result;

}

/**
 * Components/create.js
 *
 * Création d'un componenent
 */

Component.prototype.create = function(values) {

	var componenent = Element(document.createDocumentFragment());

	this.render(componenent, values);

	var DOM = document.createElement("div");
	DOM.appendChild(componenent);

	var childs = child_node_list(DOM);

	if (values._CHILDNODES_.length) {

		var inner_set = false;

		for (var i = 0; i < childs.length; i++) {

			var child = childs[i];

			if (child.getAttribute("tag-name") === "_inner_") {

				for (var i = 0; i < values._CHILDNODES_.length; i++) {

					child.parentNode.insertBefore(values._CHILDNODES_[i], child);
					
				}

				child.parentNode.removeChild(child);

				inner_set = true;

				break;

			}

		}

		if (!inner_set) {

			console.error("L'intérieur du Component \"" + this.name + "\" n'est pas défini.");

			for (var i = 0; i < values._CHILDNODES_.length; i++) {

				DOM.firstChild.appendChild(values._CHILDNODES_[i]);
				
			}

		}

	}

	var fragment = document.createDocumentFragment();

	while (DOM.childNodes.length) {

		fragment.appendChild(DOM.childNodes[0]);

	}

	return fragment;

};

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

/**
 * Components/inner.js
 *
 * Set the Component inner place
 */

Component.inner = function(element) {

	var inner_element = document.createElement("div");

	inner_element.setAttribute("tag-name", "_inner_")

	element.appendChild(inner_element);

	return element;

};

/**
 * Components/btn/main.js
 *
 * Button component model
 */

var c_btn = new Component("btn");

c_btn.render = function(component, attributes) {

	var btn = component.add(new Element("button.btn"));

	component.inner(btn);

	if (attributes.click) {

		on(btn, "CLICK", attributes.click);

	}

};

/* TEMPLATE

<btn>@{inner}</btn>

@return

<button class="btn">@{inner}</button>

@event "CLICK" => ${click} */

/**
 * Scripts/test.js
 *
 * Test Script
 */

$(function() {

	El(document.body).add(DOM('<btn id="yolo">yolo</btn>'));

	El("#yolo").on("CLICK", function() {

		console.log('test');

	});

});

window.Application = Application;

})(window, document);