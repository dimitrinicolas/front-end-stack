const glob = require('glob');
const postcss = require('postcss');

module.exports = postcss.plugin('preimport', (opts) => {
  return (css, result) => {
    return new Promise((resolve, reject) => {
      css.walkAtRules('importcomponents', rule => {
        glob(opts.glob, (error, files) => {
          if (!error) {
            for (let file of files) {
              css.insertBefore(rule, {
                name: 'import',
                params: `\"${file}\"`
              });
            }
            rule.remove();
            resolve();
          }
          else {
            reject();
          }
        });
      });
    });
  };
});
