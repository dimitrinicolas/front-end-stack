
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