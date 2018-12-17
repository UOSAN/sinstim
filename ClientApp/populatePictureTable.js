const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const uuidv4 = require('uuid/v4');

const picturesAbsolutePath = path.join(__dirname, '..', 'SamplePictures');
const categories = fs.readdirSync(picturesAbsolutePath);

let insertScript = 'INSERT INTO PICTURES (ID, PATH, FILENAME, CATEGORY) VALUES ';
_.forEach(categories, (category) => {
    const files = fs.readdirSync(path.join(picturesAbsolutePath, category));
    _.forEach(files, (fileName) => {
        insertScript +=`('${uuidv4()}', 'pictures/', '${fileName}', '${category}'),`;
    });
});
insertScript = insertScript.slice(0, -1);

fs.writeFile('insertPictureData.sql', insertScript, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log('Script Generated!');
});
