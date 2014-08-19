
/**
 * Components/btn/main.js
 *
 * Button component model
 */

var c_btn = new Component("btn");

c_btn.render = function(component, $) {

	$.type = $.type === "raised" ? "raised" : "flat";

	var btn = component.add(new Element("div.btn.btn--" + $.type));
	btn.tabIndex = 0;

	component.inner(btn);

	if ($.click) {

		on(btn, "CLICK", $.click, btn);

	}

};

/* TEMPLATE

<btn>@{inner}</btn>

======== FLAT BUTTON {default} ========

<button class="btn btn-flat">@{inner}</button>

@event "CLICK" => ${click}

======== RAISED BUTTON ========

<button class="btn btn-raised">@{inner}</button>

@event "CLICK" => ${click} */