const path = require('path');

const appDirectory = path.resolve(__dirname, '..', '..');
const resolvePath = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  outputPath: resolvePath('wwwroot/js'),
  outputFilename: 'index.bundle.js',
  entryTemplate: resolvePath('ClientApp/src/index.html'),
  entryTemplateFilename: 'index.html',
  entry: resolvePath('ClientApp/src/index.js'),
};
