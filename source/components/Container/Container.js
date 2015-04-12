"use strict";

var React = require("react");

var Container = React.createClass({

	render() {
		return (
			
			<div className="container">
				{this.props.children}
			</div>

		);
	}

});

module.exports = Container;