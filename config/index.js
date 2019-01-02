const defaultConfig = require('./default.js');
const envConfig = require(`./${process.env.NODE_ENV || 'development'}.js`);

const config = Object.assign({}, defaultConfig, envConfig);

module.exports = config;
