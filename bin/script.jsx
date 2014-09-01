/** @jsx React.DOM */

(function(win, doc){

var window = win,
	document = doc;

/**
 * main.jsx
 *
 * Fichier JavaScript principal.
 */

var Application = {

	name: "MarmWork"

};

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
 * core/$.jsx
 *
 * DOM Content Loaded function
 */

Application.domLoadEventListeners = [];

function $(callback) {

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

if (typeof document.addEventListener !== undefined) {

	document.addEventListener("DOMContentLoaded", Application.onDomContentLoaded, false);

}

else {

	document.attachEvent("onDOMContentLoaded", Application.onDomContentLoaded);

}

if (typeof window.addEventListener !== undefined) {

	window.addEventListener("load", Application.onDomContentLoaded, false);

}

else {

	window.attachEvent("onload", Application.onDomContentLoaded);

}

window.onload = function() {

    Application.onDomContentLoaded();

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

	if (typeof element.nodeName !== "string" || typeof event !== "string" || typeof fn !== "function") {

		console.error("Invalid arguments `on`", {

			element: element,
			event: event,
			fn: fn

		});

		return;

	}

	var that = {

		element: element,
		event: event,
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

				that.fn.call(that.bind, event);

			};

		}(that));

	}

	return that;

}

/**
 * core/socket.js
 *
 * Socket var define
 */

var socket = io.connect('http://localhost:3000');

Application.socket = socket;

console.log(socket);

/**
 * components/btn.jsx
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
 * components/ripple.jsx
 *
 * Ripple component
 */

var Ripple = React.createClass({

	componentDidMount: function() {

		this.getDOMNode().parentNode.addEventListener("click", this.handleClick, false);

	},

	handleClick: function() {
		
		if ((" " + this.getDOMNode().parentNode.className + " ").search("is-disabled") < 0) {

			/*var parentOffset = El(parent).offset();
			
			var clickX = event.changedTouches ? event.changedTouches[0].pageX : event.pageX,
				clickY = event.changedTouches ? event.changedTouches[0].pageY : event.pageY;
			
			circle.style.left = clickX - parentOffset.x + "px";
			circle.style.top = clickY - parentOffset.y + "px";*/

			React.renderComponent(

				<RippleCircle x="50" y="50" />,
				this.getDOMNode()

			);

		}

	},

	render: function() {

		return (
			<div className="ripple" onClick={this.handleClick}>
				{this.props.children}
			</div>
		);

	}

});

var RippleCircle = React.createClass({

	render: function() {

		var style = {

			top: this.props.y,
			left: this.props.x

		};

		return (
			<div className="ripple__circle ripple__circle--animate" style={style}></div>
		);

	}

});

/**
 * scripts/test.jsx
 *
 * Test Script
 */

$(function() {

	React.renderComponent(

		<div>
			<Button color="red">Yolo</Button>
			<Button type="raised" color="orange">Yolo</Button>
		</div>,
		document.body

	);

});

window.Application = Application;

})(window, document);