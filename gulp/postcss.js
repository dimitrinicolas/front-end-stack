var list = require("postcss/lib/list");

module.exports = function(css, processor) {

	var propsChange = {

		bg: "background",
		d: "display",
		w: "width",
		h: "height"

	};

	var displays = {

		"0":  "none",
		"n":  "none",
		"i":  "inline",
		"b":  "block",
		"ib": "inline-block",
		"f":  "flex",
		"if": "inline-flex",
		"it": "inline-table",
		"li": "list-item",
		"it": "inline-table",
		"t":  "table"
		
	};

	css.eachDecl(function(decl) {

		if (propsChange[decl.prop]) {

			decl.prop = propsChange[decl.prop];

		}

		if (decl.prop === "display") {

			decl.value = displays[decl.value] || decl.value;

		}

	});

};