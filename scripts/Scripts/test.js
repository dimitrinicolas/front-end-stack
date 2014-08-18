
/**
 * Scripts/test.js
 *
 * Test Script
 */

$(function() {

	El(document.body).add(DOM('<btn id="yolo">yolo</btn>'));

	El("#yolo").on("CLICK", function() {

		console.log('test');

	});

});