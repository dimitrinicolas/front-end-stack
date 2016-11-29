"use strict";

var postcss = require("postcss");
var glob = require("glob");

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

module.exports = postcss.plugin("plugins", function(props) {
    return function (css, result) {

        css.walkAtRules("cover", function(rule) {
            rule.parent.insertBefore(rule, { prop: "background-position", value: "center" });
            rule.parent.insertBefore(rule, { prop: "background-size", value: "cover" });
            rule.remove();
        });

        css.walkDecls("font", function(decl) {
            if (decl.prop === "font") {
                var values = decl.value.split(" ");
                if (values.length > 2) {
                    decl.parent.insertBefore(decl, { prop: "font-family", value: "$font-family-" + values[0] });
                    if (typeof fontWeights[values[1]] !== "undefined") {
                        decl.parent.insertBefore(decl, { prop: "font-weight", value: fontWeights[values[1]] + "" });
                    }
                    decl.parent.insertBefore(decl, { prop: "font-size", value: values[2] });
                    decl.remove();
                }
            }
        });

    };
});
