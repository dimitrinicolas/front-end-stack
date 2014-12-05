
/**
 * scripts/test.jsx
 *
 * Test Script
 */

onload(function() {

	React.render(

		<Container> 

			<Grid>

				<Col i="3"><Button color="red">Flat button</Button></Col>
				<Col i="3"><Button type="raised" color="red">Raised button</Button></Col>

			</Grid>

		</Container>,
		
		document.body

	);

});