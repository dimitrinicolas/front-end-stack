const folders = __dirname.split('/');

module.exports = {
  startPath: `${folders[folders.length - 2]}/`,
  proxy: 'localhost',
  port: 8081,
  browser: 'google chrome',
  files: [
    'assets/dist/script.js',
    'assets/dist/style.css',
    'assets/**/*.png',
    'assets/**/*.jpg',
    'assets/**/*.svg'
  ],
  logLevel: 'info',
  notify: false
};
