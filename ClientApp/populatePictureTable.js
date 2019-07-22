const fs = require('fs');
const path = require('path');
const endOfLine = require('os').EOL;
const _ = require('lodash');
const uuidv4 = require('uuid/v4');
const glob = require('glob');

const categoryDictionary = {
    alcohol: 'alcohol',
    bowls: 'neutral',
    buttons: 'neutral',
    cameras: 'neutral',
    chairs: 'neutral',
    chocolate: 'chocolate',
    clocks: 'neutral',
    cocaine: 'cocaine',
    cookies: 'cookies',
    donuts: 'donuts',
    fans: 'neutral',
    fries: 'fries',
    heroin: 'heroin',
    iceCream: 'icecream',
    lights: 'neutral',
    marijuana: 'marijuana',
    meth: 'methamphetamine',
    pasta: 'pasta',
    pens: 'neutral',
    phones: 'neutral',
    pills: 'pills',
    pizza: 'pizza',
    radios: 'neutral',
    teapots: 'neutral',
    tobacco: 'tobacco',
    toothbrushes: 'neutral',
    umbrellas: 'neutral'
};

// const pictureFolder = 'sample-pictures-local';
const pictureFolder = 'sample-pictures-prod';

const picturesAbsolutePath = path.join(__dirname, '..', pictureFolder);
const isDirectory = (filePath) => fs.statSync(filePath).isDirectory();
const getDirectories = (src, callback) => {
    glob(`${src}/**/*`, callback);
};
let insertScript = 'INSERT INTO PICTURES (ID, PATH, FILENAME, CATEGORY) VALUES ';

getDirectories(picturesAbsolutePath, (err, filePaths) => {
    if (err) {
        console.log('Error', err);
    } else {
        _.forEach(filePaths, (filePath) => {
            if (!isDirectory(filePath)) {
                const pictureFileName = path.basename(filePath);
                const pictureFullFilePath = filePath.substring(
                    filePath.indexOf(`${pictureFolder}${path.sep}`) + `${pictureFolder}${path.sep}`.length
                );
                const pictureFilePath = pictureFullFilePath.substring(0, _.lastIndexOf(pictureFullFilePath, path.sep));

                const category = categoryDictionary[pictureFileName.split('_')[0]];

                insertScript += `${endOfLine}('${uuidv4()}', '${pictureFilePath}', '${pictureFileName}', '${category}'),`;
            }
        });

        insertScript = insertScript.slice(0, -1);

        fs.writeFile('insertPictureData.sql', insertScript, (e) => {
            if (e) {
                return console.log(e);
            }
            console.log('Script Generated!');
        });
    }
});
