var folders = __dirname.split('/');

module.exports = {
    startPath: folders[folders.length - 2] + '/',
    proxy: 'localhost',
    port: 8081,
    files: [
        'assets/dist/script.min.js',
        'assets/dist/style.min.css',
        'assets/**/*.png',
        'assets/**/*.jpg',
        'assets/**/*.svg'
    ],
    logLevel: 'info',
    notify: false
};
