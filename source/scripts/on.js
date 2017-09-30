function on(element, event, fn) {

	if (!(typeof element.nodeName === 'string' || element === window || element === document) || typeof event !== 'string' || typeof fn !== 'function') {
		console.error('Invalid arguments');
		return;
	}

	var promise = {
		element: element,
		event: event.split(' ').join(''),
		fn: fn,
		_bind: element
	};

	promise.bind = function(bind) {
		this._bind = bind;
	}

	if (typeof promise.element.addEventListener !== 'undefined') {

		promise.element.addEventListener(promise.event, function(promise) {
			return function(event) {
				promise.fn.call(promise._bind, event);
			};
		}(promise), false);

	}

	else if (typeof promise.element.attachEvent !== 'undefined') {

		promise.element.attachEvent('on' + promise.event, function(promise) {
			return function(event) {
				promise.fn.call(promise._bind, event);
			};
		}(promise));

	}

	return promise;

}

module.exports = on;
