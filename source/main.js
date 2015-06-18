"use strict";

import React from "react";

import Button from "./components/Button";

function onload() {

	React.render((

		<div>
			<Button type="raised">Button</Button>
		</div>

	), document.body);

}

if (window.addEventListener) {

	window.addEventListener("DOMContentLoaded", onload);

}

else {

	window.attachEvent("onload", onload);

}