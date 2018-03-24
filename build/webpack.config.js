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
                        presets: ['env'],
                        cacheDirectory: true
                    }
                }
            }
		]
	}

};
