
/**
 * grid/Col.js
 *
 * Col component
 */

"use strict";

import React from "react";

var Col = React.createClass({

	render: function() {

		var className = "col-" + (this.props.i || 12);
		
		return (
			
			<div className={className}>
				{this.props.children}
			</div>

		);

	}

});

module.exports = Col;