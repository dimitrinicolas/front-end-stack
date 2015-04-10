
/**
 * button/Button.js
 *
 * Button component
 */

"use strict";

var React = require("react");

var isset = require("./../../core/isset");

var Button = React.createClass({

	render() {

		var className = "button";

		className += " button--" + (this.props.type === "raised" ? "raised" : "flat");

		if (this.props.color) {

			className += " button--" + this.props.color;

		}

		if (this.props.outline) {

			className += " button--outline-" + this.props.outline;

		}

		if (isset(this.props.disable)) {

			className += " is-disabled";

		}

		return (
			
			<div className={className} tabIndex={isset(this.props.disable) ? "1" : "0"} onClick={this.props.click}>
				{this.props.children}
			</div>

		);

	}

});

module.exports = Button;