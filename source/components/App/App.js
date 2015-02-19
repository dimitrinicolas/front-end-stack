
/**
 * app/App.js
 *
 * Application
 */

"use strict";

import React from "react";

import Container from "./../Container";
import Grid from "./../Grid";
import Col from "./../Grid/Col";
import Button from "./../Button";

var App = React.createClass({

	render: function() {

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