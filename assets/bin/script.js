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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _componentsButton = __webpack_require__(2);

	var _componentsButton2 = _interopRequireDefault(_componentsButton);

	function onload() {

		_react2["default"].render(_react2["default"].createElement(
			"div",
			null,
			_react2["default"].createElement(
				_componentsButton2["default"],
				{ type: "raised" },
				"Button"
			)
		), document.body);
	}

	if (window.addEventListener) {

		window.addEventListener("DOMContentLoaded", onload);
	} else {

		window.attachEvent("onload", onload);
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(1);
	var cx = React.addons.classSet;

	var isset = __webpack_require__(3);

	var Button = React.createClass({
		displayName: "Button",

		render: function render() {

			var props = this.props;

			var typeModifier = props.type === "raised" ? "button--raised" : "button--flat",
			    colorModifier = props.color ? "button--" + props.color : null,
			    disableModifier = isset(props.disable) ? "is-disabled" : null;

			var classes = cx("button", typeModifier, colorModifier, disableModifier);

			return React.createElement(
				"div",
				{ className: classes, tabIndex: isset(props.disable) ? "0" : "1", onClick: props.click },
				props.children
			);
		}

	});

	module.exports = Button;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	function isset(variable) {

		return typeof variable !== "undefined";
	}

	module.exports = isset;

/***/ }
/******/ ]);