/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _on = __webpack_require__(1);

	var _on2 = _interopRequireDefault(_on);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function onload() {
		console.log("onload");
	}

	if (window.addEventListener) {
		window.addEventListener("DOMContentLoaded", onload);
	} else {
		window.attachEvent("onload", onload);
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	function on(element, event, fn) {

		if (!(typeof element.nodeName === "string" || element === window || element === document) || typeof event !== "string" || typeof fn !== "function") {
			console.error("Invalid arguments");
			return;
		}

		var promise = {
			element: element,
			event: event.split(" ").join(""),
			fn: fn,
			_bind: element
		};

		promise.bind = function (bind) {
			this._bind = bind;
		};

		if (typeof promise.element.addEventListener !== "undefined") {

			promise.element.addEventListener(promise.event, function (promise) {
				return function (event) {
					promise.fn.call(promise._bind, event);
				};
			}(promise), false);
		} else if (typeof promise.element.attachEvent !== "undefined") {

			promise.element.attachEvent("on" + promise.event, function (promise) {
				return function (event) {
					promise.fn.call(promise._bind, event);
				};
			}(promise));
		}

		return promise;
	}

	module.exports = on;

/***/ }
/******/ ]);