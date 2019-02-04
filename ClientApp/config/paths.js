const path = require('path');

const appDirectory = path.resolve(__dirname, '..', '..');
const resolvePath = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
    outputPath: resolvePath('wwwroot/js'),
    eligibilityEntry: resolvePath('ClientApp/src/eligibility-app/index.js'),
    surveyEntry: resolvePath('ClientApp/src/survey-app/index.js'),
};
