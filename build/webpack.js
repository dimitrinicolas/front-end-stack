"use strict";

module.exports = {

    externals: {
        "react": "React"
    },

    module: {
		rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015", "react"],
                        cacheDirectory: true
                    }
                }
            }
		]
	}

};
