"use strict";

var config = require("../config.json");

module.exports = {

	browserSync: true,
	browserSyncProxy: "localhost:" + config.localPort,
	browserSyncProxyPort: config.localPort

};