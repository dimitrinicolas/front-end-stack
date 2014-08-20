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
 * Events/main.js
 *
 * Add event to an element
 */

Application.Events = {

	list: {}

};

Application.Events.add = function(name, fn) {

	Application.Events.list[name] = fn;

};

function on(element, event, callback, binding) {

	if (element.length) {

		for (var i = 0; i < element.length; i++) {

			on(element[i], event, callback, binding);

		}

		return;

	}

	if (element.nodeName === "#document-fragment") {

		on(element.childNodes, event, callback, binding)

		return;

	}

	if (typeof Application.Events.list[event] === "function") {

		Application.Events.list[event](element, function() {

			return function(event) {

				callback(event, binding);

			};

		}(callback, binding));

	}

	else {

		if (typeof element.addEventListener !== "undefined") {

			element.addEventListener(event, function() {

				return function(event) {

					callback(event, binding);

				}

			}(callback, binding), false);

		}

		else {

			element.attachEvent("on" + event, function() {

				return function(event) {

					callback(event, binding);

				}

			}(callback, binding));
			
		}

	}

	return element;

}

/**
 * Events/CLICK.js
 *
 * CLICK event
 */

Application.Events.on_tap_events_list = [];

Application.Events.add("CLICK", function(element, callback) {

	var event_listener = new Application.Events.on_tap_object(element, callback);

	Application.Events.on_tap_events_list.push(event_listener);

});

Application.Events.on_tap_object = function(element, callback) {

	this.callback = callback;
	this.element = element;

	this.touchstart = function(event_listener) {

		return function(event) {

			event_listener.moved = false;

			event_listener.startX = event.touches[0].clientX;
			event_listener.startY = event.touches[0].clientY;

		}

	}(this);

	this.touchmove = function(event_listener) {

		return function(event) {

			if (Math.abs(event.touches[0].clientX - event_listener.startX) > 10 || Math.abs(event.touches[0].clientY - event_listener.startY) > 10) {
			    
			    event_listener.moved = true;

			}

		}

	}(this);

	this.touchend = function(event_listener) {

		return function(event) {

			if (!event_listener.moved) {

				event_listener.callback(event);

			}

		}

	}(this);

	on(this.element, "touchstart", this.touchstart);
	on(this.element, "touchmove", this.touchmove);
	on(this.element, "touchend", this.touchend);
	on(this.element, "touchcancel", this.touchend);

	on(this.element, "click", function(event, event_listener) {

	    if (!("ontouchstart" in window)) {

	        event_listener.callback(event);

	    }

	}, this);

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

marmottajax.delete_ = function(parameters) {

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

	element.offset = function(element) {

		return function() {

			var offsets = {

				x: 0,
				y: 0

			}

			while (element) {

			    offsets.x += (element.offsetLeft - (element == document.body ? 0 : element.scrollLeft) + element.clientLeft);
			    offsets.y += (element.offsetTop - (element == document.body ? 0 : element.scrollTop) + element.clientTop);
			    element = element.offsetParent;

			}

			return offsets;

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

	var class_names = name.replace(/#([a-z-_]+)/i, "").replace(/\w+/, "").split(".");

	if (class_names.length > 1) {

		element.className = "";

		for (var i = 1; i < class_names.length; i++) {

			element.className += " " + class_names[i];

		}

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

				var length = values._CHILDNODES_.length;

				for (var i = 0; i < length; i++) {

					child.parentNode.insertBefore(values._CHILDNODES_[0], child);
					
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

	html = html.replace(/<(\w*)( (.+?))?\/>/g,'<$1$2></$1>');

	html = html.replace(/<(\w*)( (.+?))?>/g,'<div tag-name="$1"$2>').replace(/<\/(.+?)>/g,'</div>');

	var element = document.createElement("div");
	element.innerHTML = html;

	var no_more_conponent = false,
		element_generated = false;
		loops = 0;

	while (!no_more_conponent) {

		element_generated = false;

		loops ++;

		if (loops > 10) {

			console.error("Une boucle de création de component a été détéctée");

			no_more_conponent = true;

		}
		
		var childs = child_node_list(element);

		for (var i = 0; i < childs.length; i++) {

			var child = childs[i];

			var tag_name = "";
			
			if (child.getAttribute) {

				tag_name = child.getAttribute("tag-name") || "";

			}

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

				element_created.removeAttribute("tag-name");

				child.parentNode.insertBefore(component, child);
				child.parentNode.removeChild(child);

				element_generated = true;

				break;

			}

		}

		if (!element_generated) {

			no_more_conponent = true;

		}

	}

	return element.childNodes;

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
 * Button component
 */

var c_btn = new Component("btn");

c_btn.render = function(component, $) {

	$.type = $.type === "raised" ? "raised" : "flat";

	var color = "";

	if ($.color) {

		color = ".btn--" + $.color;

	}

	var btn = component.add(new Element("div.btn.btn--" + $.type + color));
	btn.tabIndex = 0;

	component.inner(btn);

	if ($.click) {

		on(btn, "CLICK", $.click, btn);

	}

	if (!$["no-ripple"]) {

		El(btn).add(DOM('<ripple parent="${parent}"/>', {

			parent: btn

		}));

	}

};

/* TEMPLATE

<btn type="flat|raised" color? click? no-ripple?>@{inner}</btn> */

/**
 * Components/ripple/main.js
 *
 * Ripple component
 */

var c_ripple = new Component("ripple");

c_ripple.render = function(component, $) {

	var ripple = component.add(new Element("div.ripple"));

	component.inner(ripple);

	// ripple.className += " animate";

	if ($.parent) {

		on($.parent, "CLICK", function(event, elements) {

			var ripple = elements.ripple,
				parent = elements.parent;

			var circle = ripple.add(new El("div.ripple__circle.ripple__circle--animate"));

			var parent_offset = El(parent).offset();

			circle.style.left = event.pageX - parent_offset.x + "px";
			circle.style.top = event.pageY - parent_offset.y + "px";


		}, {

			ripple: ripple,
			parent: $.parent

		});

	}

};

/* TEMPLATE

<ripple parent="${parent-node}"/> */

/**
 * Scripts/test.js
 *
 * Test Script
 */

$(function() {

	El(document.body).add(DOM('<btn color="purple">flat</btn>'
		                    + '<btn type="raised">raised</btn>'));

});

window.Application = Application;

})(window, document);