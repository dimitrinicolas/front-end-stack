"use strict";

var variables = {};

var fontStyles = ["italic"];

var fontWeights = {

	extralight: 100,
	thin:       200,
	light:      300,
	regular:    400,
	medium:     500,
	semibold:   600,
	bold:       700,
	black:      800,
	extrabold:  900

};

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

	var result = {};

	result["font-family"] = "$font-family-" + value;

	if (size) {
		result["font-size"] = size;
	}

	return result;

};