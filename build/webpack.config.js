module.exports = {

    mode: 'development',

    externals: {
        react: 'React'
    },

    module: {
		rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2017', 'react'],
                        cacheDirectory: true
                    }
                }
            }
		]
	}

};
