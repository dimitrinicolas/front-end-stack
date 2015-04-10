
/**
 * grid/Col.js
 *
 * Col component
 */

"use strict";

var React = require("react");

var Col = React.createClass({

	render() {

		var className = "col-" + (this.props.i || 12);
		
		return (
			
			<div className={className}>
				{this.props.children}
			</div>

		);

	}

});

module.exports = Col;