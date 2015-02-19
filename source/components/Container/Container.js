
/**
 * container/container.js
 *
 * Container component
 */

"use strict";

import React from "react";

var Container = React.createClass({

	render: function() {
		
		return (
			
			<div className="container">
				{this.props.children}
			</div>

		);

	}

});

module.exports = Container;