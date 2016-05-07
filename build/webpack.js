"use strict";

module.exports = {

    externals: {
        "react": "React"
    },

    module: {
		loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "react"]
                }
            }
		]
	}

};
