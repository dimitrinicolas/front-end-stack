module.exports = {
    plugins: [
        require('./plugins/postcss-preimport.js'),
        require('postcss-import'),
        require('postcss-nested'),
        require('postcss-inline-media'),
        require('./plugins/postcss-plugin.js'),
        require('postcss-simple-vars'),
        require('postcss-calc'),
        require('postcss-size'),
        require('postcss-axis'),
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
        browsers: 'last 2 versions'
    },
    'postcss-pxtorem': {
        'replace': false
    }
};
