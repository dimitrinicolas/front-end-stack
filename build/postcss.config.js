module.exports = {
    plugins: [
        require('./postcss-preimport.js'),
        require('postcss-import'),
        require('postcss-nested'),
        require('postcss-inline-media'),
        require('./postcss-plugin.js'),
        require('postcss-simple-vars'),
        require('postcss-calc'),
        require('postcss-size'),
        require('postcss-position'),
        require('autoprefixer'),
        require('postcss-pxtorem'),
        require('postcss-color-function')
    ],
    'local-plugins': true,
    'postcss-calc': {
        preserve: false
    },
    autoprefixer: {
        browsers: 'last 1 version'
    },
    'postcss-pxtorem': {
        'replace': false
    }
};
