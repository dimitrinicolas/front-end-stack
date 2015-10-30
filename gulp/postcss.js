"use strict";

var list = require("postcss/lib/list");

var customProps = {

	"p": "position",

	"d": "display",
	"w": "width",
	"h": "height",
	"min-w": "min-width",
	"min-h": "min-height",
	"max-w": "max-width",
	"max-h": "max-height",

	"bg": "background",
	"tt": "text-transform",
	"ta": "text-align",
	"lh": "line-height",

};

var customValues = {

	"display": {

		"0":  "none",
		"n":  "none",
		"i":  "inline",
		"b":  "block",
		"ib": "inline-block",
		"f":  "flex",
		"if": "inline-flex",
		"it": "inline-table",
		"li": "list-item",
		"t":  "table",
		
	},

	"overflow": {

		"a": "auto",
		"h": "hidden",
		"v": "visible",

	},

	"text-transform": {

		"low": "lowercase",
		"up":  "uppercase",
		"upp": "uppercase",
		"cap": "capitalize"

	}

};

module.exports = function(css, processor) {

	css.eachDecl(function(decl) {

		if (customProps[decl.prop]) {
			decl.prop = customProps[decl.prop];
		}

		if (customValues[decl.prop]) {
			decl.value = customValues[decl.prop][decl.value] || decl.value;
		}

	});

};