module.exports = {
  mode: 'production',
  externals: {
    react: 'React'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  performance: {
    hints: 'error'
  }
};
