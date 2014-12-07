/** @jsx React.DOM */

(function(win, doc){

var window = win,
	document = doc;

/**
 * main.jsx
 *
 * Fichier JavaScript principal.
 */

var Application = {};

/**
 * main.js
 *
 * Main librairy file
 */

var Ajax = function() {

	if (typeof this.self !== "undefined") {

		return new Ajax(Ajax.normalizeData(arguments));

	}

	var data = Ajax.normalizeData(arguments);

	if (data === null) {

		throw "Les arguments passées à la fonction Ajax sont invalides.";

	}

	this.url = data.url;
	this.method = data.method;
	this.json = data.json;
	this.watch = data.watch;
	this.parameters = data.parameters;

	if (this.method === "post" || this.method === "put" || this.method === "update" || this.method === "delete") {

		this.postData = "?";

		for (var key in this.parameters) {

			this.postData += this.parameters.hasOwnProperty(key) ? "&" + key + "=" + this.parameters[key] : "";

		}

	}

	else {

		this.url += this.url.indexOf("?") < 0 ? "?" : "";

		for (var key in this.parameters) {

		    this.url += this.parameters.hasOwnProperty(key) ? "&" + key + "=" + this.parameters[key] : "";

		}

	}

	this.setXhr();

	this.setWatcher();

};

/**
 * constants.js
 *
 * Constants variables
 */

Ajax.defaultData = {

	method: "get",
	json: false,
	watch: -1,

	parameters: {}

};

Ajax.validMethods = ["get", "post", "put", "update", "delete"];

/**
 * normalize-data.js
 *
 * Normalize data in Ajax request
 */

Ajax.normalizeData = function(data) {

	with (data) {

	/**
	 * Search data in arguments
	 */

	if (data.length === 0) {

		return null;

	}

	var result = {};

	if (data.length === 1 && typeof data[0] === "object") {

		result = data[0];

	}

	else if (data.length === 1 && typeof data[0] === "string") {

		result = {

			url: data[0]

		};

	}

	else if (data.length === 2 && typeof data[0] === "string" && typeof data[1] === "object") {

		data[1].url = data[0];

		result = data[1];

	}

	}

	/**
	 * Normalize data in arguments
	 */

	if (!(typeof result.method === "string" && Ajax.validMethods.indexOf(result.method.toLowerCase()) != -1)) {

		result.method = Ajax.defaultData.method;

	}

	else {

		result.method = result.method.toLowerCase();

	}

	if (typeof result.json !== "boolean") {

		result.json = Ajax.defaultData.json;

	}

	if (typeof result.watch !== "number") {

		result.watch = Ajax.defaultData.watch;

	}

	if (typeof result.parameters !== "object") {

		result.parameters = Ajax.defaultData.parameters;

	}

	return result;

};

/**
 * set-xhr.js
 *
 * Set Watcher 
 */

Ajax.prototype.setWatcher = function() {

	if (this.watch !== -1) {

		this.watchIntervalFunction = function() {

			if (this.xhr.readyState === 4 && this.xhr.status === 200) {

				this.updateXhr();

			}

			this.watcherTimeout();

		};

		this.watcherTimeout();

		this.stop = function() {

			this.changeTime(-1);

		};

		this.changeTime = function(newTime) {

			clearTimeout(this.changeTimeout);

			this.watch = typeof newTime === "number" ? newTime : this.watch;

			this.watcherTimeout();

		};

	}

};

/**
 * set-xhr.js
 *
 * Set XMLHttpRequest 
 */

Ajax.prototype.setXhr = function() {

	this.xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

	this.xhr.lastResult = null;

	this.xhr.json = this.json;
	this.xhr.binding = null;

	this.bind = function(binding) {

		this.xhr.binding = binding;

		return this;

	};

	this.cancel = function(callback) {

		this.xhr.abort();

		return this;

	};

	this.xhr.callbacks = {

		then: [],
		change: [],
		error: []

	};

	for (name in this.xhr.callbacks) {

		if (this.xhr.callbacks.hasOwnProperty(name)) {

			this[name] = function(name) {

				return function(callback) {

					this.xhr.callbacks[name].push(callback);

					return this;

				};

			}(name);

		}

	}

	this.xhr.call = function(categorie, result) {

		for (var i = 0; i < this.callbacks[categorie].length; i++) {

			if (typeof(this.callbacks[categorie][i]) === "function") {

				if (this.binding) {

					this.callbacks[categorie][i].call(this.binding, result);

				}

				else {

					this.callbacks[categorie][i](result);

				}

			}

		}

	};

	this.xhr.onreadystatechange = function() {

		if (this.readyState === 4 && this.status == 200) {

			var result = this.responseText;

			if (this.json) {

				try {

					result = JSON.parse(result);

				}

				catch (error) {

					this.call("error", "invalid json");

					return false;

				}

			}

			this.lastResult = result;

			this.call("then", result);

		}

		else if (this.readyState === 4 && this.status == 404) {

			this.call("error", "404");

		}

		else if (this.readyState === 4) {

			this.call("error", "unknow");

		}

	};

	this.xhr.open(this.method, this.url, true);
	this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	this.xhr.send(typeof this.postData != "undefined" ? this.postData : null);

};

/**
 * update-xhr.js
 *
 * Update XMLHttpRequest result 
 */

Ajax.prototype.updateXhr = function() {

	var data = {

		lastResult: this.xhr.lastResult,

		json: this.xhr.json,
		binding: this.xhr.binding,

		callbacks: {

			then: this.xhr.callbacks.then,
			change: this.xhr.callbacks.change,
			error: this.xhr.callbacks.error

		}

	};

	this.xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

	this.xhr.lastResult = data.lastResult;

	this.xhr.json = data.json;
	this.xhr.binding = data.binding;

	this.xhr.callbacks = {

		then: data.callbacks.then,
		change: data.callbacks.change,
		error: data.callbacks.error

	};

	this.xhr.call = function(categorie, result) {

		for (var i = 0; i < this.callbacks[categorie].length; i++) {

			if (typeof(this.callbacks[categorie][i]) === "function") {

				if (this.binding) {

					this.callbacks[categorie][i].call(this.binding, result);

				}

				else {

					this.callbacks[categorie][i](result);

				}

			}

		}

	};

	this.xhr.onreadystatechange = function() {

		if (this.readyState === 4 && this.status == 200) {

			var result = this.responseText;

			if (this.json) {

				try {

					result = JSON.parse(result);

				}

				catch (error) {

					this.call("error", "invalid json");

					return false;

				}

			}

			isDifferent = this.lastResult != result;

			try {

				isDifferent = (typeof this.lastResult !== "string" ? JSON.stringify(this.lastResult) : this.lastResult) != (typeof result !== "string" ? JSON.stringify(result) : result);

			}

			catch (error) {}

			if (isDifferent) {

				this.call("change", result);

			}

			this.lastResult = result;

		}

		else if (this.readyState === 4 && this.status == 404) {

			this.call("error", "404");

		}

		else if (this.readyState === 4) {

			this.call("error", "unknow");

		}

	};

	this.xhr.open(this.method, this.url, true);
	this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	this.xhr.send(typeof postData != "undefined" ? postData : null);

};

/**
 * set-xhr.js
 *
 * Set Watcher 
 */

Ajax.prototype.watcherTimeout = function() {

	if (this.watch !== -1) {

		this.changeTimeout = setTimeout(function(that) {

			return function() {

				that.watchIntervalFunction();

			};

		}(this), this.watch);

	}

};

/**
 * core/$.jsx
 *
 * DOM Selectors
 */

var $ = function(swag) {

	return document.querySelectorAll(swag);

};

/**
 * core/isset.jsx
 *
 * Test if a variable exist
 */

function isset(variable) {

	return typeof variable !== "undefined";

}

/**
 * core/on.jsx
 *
 * Add event to element
 */

function on(element, event, fn) {

	if (!(typeof element.nodeName === "string" || element === window || element === document) || typeof event !== "string" || typeof fn !== "function") {

		console.error("Invalid arguments `on`", {

			element: element,
			event: event,
			fn: fn

		});

		return;

	}

	var that = {

		element: element,
		event: event.split(" ").join(""),
		fn: fn,
		_bind: element

	};

	that.bind = function(bind) {

		this._bind = bind;

	}

	if (typeof that.element.addEventListener !== "undefined") {

		that.element.addEventListener(that.event, function(that) {

			return function(event) {

				that.fn.call(that._bind, event);

			};

		}(that), false);

	}

	else if (typeof that.element.attachEvent !== "undefined") {

		that.element.attachEvent("on" + that.event, function(that) {

			return function(event) {

				that.fn.call(that._bind, event);

			};

		}(that));

	}

	return that;

}

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

/**
 * core/variables.jsx
 * 
 * Variables
 */

var I =    1,
	V =    5,
	X =   10,
	L =   50,
	C =  100,
	D =  500,
	M = 1000;

/**
 * components/button.jsx
 *
 * Button component
 */

var Button = React.createClass({

	render: function() {

		var className = "button";

		className += " button--" + (this.props.type === "raised" ? "raised" : "flat");

		if (this.props.color) {

			className += " button--" + this.props.color;

		}

		if (this.props.outline) {

			className += " button--outline-" + this.props.outline;

		}

		if (this.props.ripple) {

			className += " button--ripple-" + this.props.ripple;

		}

		if (isset(this.props.disable)) {

			className += " is-disabled";

		}

		return (
			
			<div className={className} tabIndex={isset(this.props.disable) ? "1" : "0"} onClick={this.props.click}>
				{this.props.children}
			</div>

		);

	}

});

/**
 * components/container.jsx
 *
 * Container component
 */

var Container = React.createClass({

	render: function() {
		
		return (
			
			<div className="container">
				{this.props.children}
			</div>

		);

	}

});

/**
 * components/grid.jsx
 *
 * Grid component
 */

var Grid = React.createClass({

	render: function() {
		
		return (
			
			<div className="grid">
				{this.props.children}
			</div>

		);

	}

});

var Col = React.createClass({

	render: function() {

		var className = "col-" + (this.props.i || 12);
		
		return (
			
			<div className={className}>
				{this.props.children}
			</div>

		);

	}

});

/**
 * scripts/test.jsx
 *
 * Test Script
 */

onload(function() {

	React.render(

		<Container> 

			<Grid>

				<Col i="3"><Button color="red">Cancel</Button></Col>
				<Col i="3"><Button type="raised" color="red">Raised button</Button></Col>

			</Grid>

		</Container>,
		
		document.body

	);

});

window.Application = Application;

})(window, document);