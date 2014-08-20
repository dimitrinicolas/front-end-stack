
/**
 * Components/ripple/main.js
 *
 * Ripple component
 */

var c_ripple = new Component("ripple");

c_ripple.render = function(component, $) {

	var ripple = component.add(new Element("div.ripple"));

	component.inner(ripple);

	// ripple.className += " animate";

	if ($.parent) {

		on($.parent, "CLICK", function(event, elements) {

			var ripple = elements.ripple,
				parent = elements.parent;

			var circle = ripple.add(new El("div.ripple__circle.ripple__circle--animate"));

			var parent_offset = El(parent).offset();

			circle.style.left = event.pageX - parent_offset.x + "px";
			circle.style.top = event.pageY - parent_offset.y + "px";


		}, {

			ripple: ripple,
			parent: $.parent

		});

	}

};

/* TEMPLATE

<ripple parent="${parent-node}"/> */