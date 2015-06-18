"use strict";

var variables = require("../../config/others.js");

var fontStyles = ["italic"];

var fontWeights = {

	light:   300,
	regular: 500,
	medium:  500,
	bold:    700

};

var fontFamilys = ["paragraph", "title"];

module.exports = function(mixin, value, size) {

	if (!!~fontStyles.indexOf(value)) {
		return {

			"font-style": value

		};
	}

	if (fontWeights[value]) {
		return {

			"font-weight": fontWeights[value]

		};
	}

	if (!!~fontFamilys.indexOf(value)) {

		var result = {};

		var fontFamilyValue = variables["font-family-" + value] || null;

		if (fontFamilyValue) {

			result["font-family"] = fontFamilyValue;

		}

		if (size) {

			result["font-size"] = size;

		}

		return result;

	}

};