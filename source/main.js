"use strict";

import on from "./scripts/on.js";

function onload() {
    console.log("onload");
}

if (window.addEventListener) {
	window.addEventListener("DOMContentLoaded", onload);
}
else {
	window.attachEvent("onload", onload);
}
