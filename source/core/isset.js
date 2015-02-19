
/**
 * core/isset.js
 *
 * Test if a variable exist
 */

"use strict";

function isset(variable) {

	return typeof variable !== "undefined";

}

module.exports = isset;