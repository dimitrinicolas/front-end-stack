
/**
 * Scripts/test.js
 *
 * Test Script
 */

$(function() {

	var btns = El(document.body).add(DOM('<btn>yolo</btn>'));

	on(btns, "CLICK", function(event, btns) {

		console.log(btns);

	}, btns);

});