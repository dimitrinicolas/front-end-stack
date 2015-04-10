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

	
	/**
	 * main.js
	 *
	 * Fichier JavaScript principal.
	 */

	"use strict";

	var React = __webpack_require__(1);

	var App = __webpack_require__(2);

	function onload() {

		React.render(React.createElement(App, null), document.body);
	}

	if (window.addEventListener) {

		window.addEventListener("DOMContentLoaded", onload);
	} else {

		window.attachEvent("onload", onload);
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * app/App.js
	 *
	 * Application
	 */

	"use strict";

	var React = __webpack_require__(1);

	var Container = __webpack_require__(5);
	var Grid = __webpack_require__(4);
	var Col = __webpack_require__(3);
	var Button = __webpack_require__(6);

	var App = React.createClass({ displayName: "App",

		render: function render() {
			return React.createElement("div", { className: "app" }, React.createElement(Container, null, React.createElement(Grid, null, React.createElement(Col, { i: "3" }, React.createElement(Button, { color: "red" }, "Cancel")), React.createElement(Col, { i: "3" }, React.createElement(Button, { type: "raised", color: "red" }, "Raised button")))));
		}

	});

	module.exports = App;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * grid/Col.js
	 *
	 * Col component
	 */

	"use strict";

	var React = __webpack_require__(1);

	var Col = React.createClass({ displayName: "Col",

		render: function render() {

			var className = "col-" + (this.props.i || 12);

			return React.createElement("div", { className: className }, this.props.children);
		}

	});

	module.exports = Col;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * grid/Grid.js
	 *
	 * Grid component
	 */

	"use strict";

	var React = __webpack_require__(1);

	var Grid = React.createClass({ displayName: "Grid",

		render: function render() {
			return React.createElement("div", { className: "grid" }, this.props.children);
		}

	});

	module.exports = Grid;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * container/container.js
	 *
	 * Container component
	 */

	"use strict";

	var React = __webpack_require__(1);

	var Container = React.createClass({ displayName: "Container",

		render: function render() {
			return React.createElement("div", { className: "container" }, this.props.children);
		}

	});

	module.exports = Container;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * button/Button.js
	 *
	 * Button component
	 */

	"use strict";

	var React = __webpack_require__(1);

	var isset = __webpack_require__(7);

	var Button = React.createClass({ displayName: "Button",

			render: function render() {

					var className = "button";

					className += " button--" + (this.props.type === "raised" ? "raised" : "flat");

					if (this.props.color) {

							className += " button--" + this.props.color;
					}

					if (this.props.outline) {

							className += " button--outline-" + this.props.outline;
					}

					if (isset(this.props.disable)) {

							className += " is-disabled";
					}

					return React.createElement("div", { className: className, tabIndex: isset(this.props.disable) ? "1" : "0", onClick: this.props.click }, this.props.children);
			}

	});

	module.exports = Button;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * core/isset.js
	 *
	 * Test if a variable exist
	 */

	"use strict";

	function isset(variable) {

	  return typeof variable !== "undefined";
	}

	module.exports = isset;

/***/ }
/******/ ]);