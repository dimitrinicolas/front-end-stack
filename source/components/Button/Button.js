"use strict";

var React = require("react");
var cx = React.addons.classSet;

var isset = require("./../../core/isset");

var Button = React.createClass({

	render() {

		var props = this.props;

		var typeModifier = props.type === "raised" ? "button--raised" : "button--flat",
			colorModifier = props.color ? "button--" + props.color : null,
			disableModifier = isset(props.disable) ? "is-disabled" : null;

		var classes = cx("button", typeModifier, colorModifier, disableModifier);

		return (
			
			<div className={classes} tabIndex={isset(props.disable) ? "0" : "1"} onClick={props.click}>
				{props.children}
			</div>

		);

	}

});

module.exports = Button;