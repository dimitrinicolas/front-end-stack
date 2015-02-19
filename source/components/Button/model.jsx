"use strict";

var React = require("react");

module.exports = {

	name: "Button",

	examples: function() {

		return [

			(<Button>Button</Button>),
			(<Button type="raised">Raised button</Button>),
			(<Button color="red">Red button</Button>),
			(<Button outline="blue">Blue outline button</Button>),
			(<Button disabled>Disabled button</Button>)

		];

	}

};