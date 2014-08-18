
/**
 * Components/btn/main.js
 *
 * Button component model
 */

var c_btn = new Component("btn");

c_btn.render = function(component, attributes) {

	var btn = component.add(new Element("button.btn"));

	component.inner(btn);

	if (attributes.click) {

		on(btn, "CLICK", attributes.click);

	}

};

/* TEMPLATE

<btn>@{inner}</btn>

@return

<button class="btn">@{inner}</button>

@event "CLICK" => ${click} */