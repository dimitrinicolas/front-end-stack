var folders = __dirname.split('/');

module.exports = {
    startPath: folders[folders.length - 2] + '/index.html',
    proxy: 'localhost',
    port: 8081,
    files: 'assets/**/*.*',
    logLevel: 'info',
    notify: false
};
