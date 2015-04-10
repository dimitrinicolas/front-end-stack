
/**
 * grid/Grid.js
 *
 * Grid component
 */

"use strict";

var React = require("react");

var Grid = React.createClass({

	render() {
		return (
			
			<div className="grid">
				{this.props.children}
			</div>

		);
	}

});

module.exports = Grid;