
/**
 * Scripts/test.js
 *
 * Test Script
 */

$(function() {

	var btn = El(document.body).add(DOM('<btn click="${onclick}">flat</btn><btn type="raised">raised</btn>', {

		onclick: function(event, btn) {

			console.log(btn);

		}

	}));

});