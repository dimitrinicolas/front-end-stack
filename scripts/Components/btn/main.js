
/**
 * Components/btn/main.js
 *
 * Button component
 */

var c_btn = new Component("btn");

c_btn.render = function(component, $) {

	$.type = $.type === "raised" ? "raised" : "flat";

	var color = "";

	if ($.color) {

		color = ".btn--" + $.color;

	}

	var btn = component.add(new Element("div.btn.btn--" + $.type + color));
	btn.tabIndex = 0;

	component.inner(btn);

	if ($.click) {

		on(btn, "CLICK", $.click, btn);

	}

	if (!$["no-ripple"]) {

		El(btn).add(DOM('<ripple parent="${parent}"/>', {

			parent: btn

		}));

	}

};

/* TEMPLATE

<btn type="flat|raised" color? click? no-ripple?>@{inner}</btn> */