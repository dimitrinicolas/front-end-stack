module.exports = {
  proxy: 'localhost: 3000',
  port: 3001,
  browser: 'google chrome',
  files: [
    'public /**/*.*'
  ],
  logLevel: 'info',
  logPrefix: 'Browser Sync',
  notify: false
};
