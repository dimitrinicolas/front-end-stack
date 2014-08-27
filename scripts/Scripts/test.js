
/**
 * scripts/test.js
 *
 * Test Script
 */

$(function() {

	El(document.body).add(Co("<div>Flat buttons</div>"));

	El(document.body).add(Co('<btn>button</btn>'
		                   + '<btn color="red">colored</btn>'
		 				   + '<btn disable>disabled</btn>'));

	El(document.body).add(Co("<div>Raised buttons</div>"));

	El(document.body).add(Co('<btn type="raised">button</btn>'
						   + '<btn type="raised" color="red">colored</btn>'
		                   + '<btn type="raised" disable>disabled</btn>'));

});