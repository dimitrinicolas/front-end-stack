"use strict";

var merge = require("merge");

var breakpointsValues = {

	"_lt":  "360px",
	"_xs":  "480px",
	"_sm":  "768px",
	"_md":  "992px",
	"_lg": "1200px",
	"_xl": "1600px"

};

var breakpointsMedia = {

	"lt": "(max-width: " + breakpointsValues._lt + ")",
	"xs": "(max-width: " + breakpointsValues._xs + ")",
	"sm": "(max-width: " + breakpointsValues._sm + ")",
	"md": "(max-width: " + breakpointsValues._md + ")",
	"lg": "(max-width: " + breakpointsValues._lg + ")",
	"xl": "(max-width: " + breakpointsValues._xl + ")"

};

var breakpoints = merge(breakpointsValues, breakpointsMedia);

module.exports = breakpoints;