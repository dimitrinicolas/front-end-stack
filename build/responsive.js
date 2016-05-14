"use strict";

var postcss = require("postcss");
var glob = require("glob")
var valueParser = require("postcss-value-parser");


function parse(nodes) {

    var base = "";
    var querys = [];

    for (var i = 0; i < nodes.length; i++) {

        var node = nodes[i];

        if (node.type == "function" && node.value === "@") {
            querys[querys.length] = {
                media: "(",
                value: ""
            };
            querys[querys.length - 1].media = "(";
            for (var j = 0; j < node.nodes.length; j++) {
                var item = node.nodes[j];
                if (item.type == "function") {
                    querys[querys.length - 1].media += valueParser.stringify(item);
                } else {
                    querys[querys.length - 1].media += item.value;
                }
            }
            querys[querys.length - 1].media += ")";
        }
        else if (node.type == "word" && /^@/gi.test(node.value)) {
            querys[querys.length] = {
                media: "(",
                value: ""
            };
            querys[querys.length - 1].media = "$" + node.value.replace(/^@/gi, "");
        }
        else if (querys.length > 0) {
            if (node.type == "function") {
                querys[querys.length - 1].value += valueParser.stringify(node);
            } else {
                querys[querys.length - 1].value += node.value;
            }
        }

        // TODO TO STRING FUNC
        if (querys.length < 1) {
            if (node.type == "function") {
                base += valueParser.stringify(node);
            } else {
                base += node.value;
            }
        }

    }

    console.log("BAAASE" ,base);

    return {
        base: base,
        querys: querys
    };

}

module.exports = postcss.plugin("responsive", function() {
    return function (css, result) {

        css.walk(function(rule) {
            if (rule.type == "decl") {

                var root = rule.root(),
                    value = rule.value;

                if (/@/gi.test(value)) {

                    var parsed = valueParser(value);

                    var content = parse(parsed.nodes);

                    if (content.base.replace(/ /gi, "") !== "") {
                        rule.parent.insertBefore(rule, {
                            prop: rule.prop,
                            value: content.base.replace(/\s\s+|^ | $/g, "")
                        });
                    }

                    for (var i = 0; i < content.querys.length; i++) {
                        var q = content.querys[i];
                        var atRule = postcss.atRule({
                            name: "media",
                            params: q.media
                        });
                        var mediaRule = postcss.rule({
                            selector: rule.parent.selector,
                        });
                        mediaRule.append({
                            prop: rule.prop,
                            value: q.value.replace(/\s\s+|^\s|\s$/g, "")
                        });
                        atRule.append(mediaRule);
                        root.append(atRule);
                    }

                    rule.remove();

                }

            }
        });

    };
});
