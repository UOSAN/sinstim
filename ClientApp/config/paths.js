const path = require('path');

const appDirectory = path.resolve(__dirname, '..', '..');
const resolvePath = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
    outputPath: resolvePath('wwwroot/js'),
    entryTemplate: resolvePath('ClientApp/src/index.html'),
    entryTemplateFilename: 'index.html',
    eligibilityEntry: resolvePath('ClientApp/src/eligibility/index.js'),
    surveyEntry: resolvePath('ClientApp/src/survey/index.js'),
};
