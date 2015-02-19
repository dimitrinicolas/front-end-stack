
/**
 * grid/Grid.js
 *
 * Grid component
 */

"use strict";

import React from "react";

var Grid = React.createClass({

	render: function() {
		
		return (
			
			<div className="grid">
				{this.props.children}
			</div>

		);

	}

});

module.exports = Grid;