
/**
 * app/App.js
 *
 * Application
 */

"use strict";

var React = require("react");

var Container = require("./../Container");
var Grid = require("./../Grid");
var Col = require("./../Grid/Col");
var Button = require("./../Button");

var App = React.createClass({

	render() {
		return (
			
			<div className="app">
				
				<Container> 

					<Grid>

						<Col i="3"><Button color="red">Cancel</Button></Col>
						<Col i="3"><Button type="raised" color="red">Raised button</Button></Col>

					</Grid>

				</Container>

			</div>

		);
	}

});

module.exports = App;