"use strict";

var React = require("react");

var Container = require("./../Container");
var Button = require("./../Button");

var App = React.createClass({

	render() {
		return (
			
			<div className="app">
				
				<Container> 

					<Button color="red">Flat</Button>
					<Button type="raised" color="red">Raised button</Button>
					<Button disable>Disabled</Button>

				</Container>

			</div>

		);
	}

});

module.exports = App;