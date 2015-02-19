
/**
 * main.js
 *
 * Fichier JavaScript principal.
 */

"use strict";

import React from "react";

import App from "./components/App";

function onload() {

	React.render(

		<App />,
		
		document.body

	);

};

if (window.addEventListener) {

	window.addEventListener("DOMContentLoaded", onload);

}

else {

	window.attachEvent("onload", onload);

}