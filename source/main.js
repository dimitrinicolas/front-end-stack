"use strict";

var React = require("react");

var App = require("./components/App");

function onload() {

	// React.render(<App />, document.body);

}

if (window.addEventListener) {

	window.addEventListener("DOMContentLoaded", onload);

}

else {

	window.attachEvent("onload", onload);

}