"use strict";

var path = require("path");

module.exports = {

    externals: {
        "react": "React"
    },

    module: {
		loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "react"],
                    cacheDirectory: true
                }
            }
		]
	}

};
