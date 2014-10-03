
/**
 * scripts/test.jsx
 *
 * Test Script
 */

onload(function() {

	React.renderComponent(

		<div>
			<Button color="red">Flat button</Button>
			<Button type="raised" color="orange">Raised button</Button>
		</div>,
		
		document.body

	);

});