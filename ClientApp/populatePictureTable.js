const fs = require('fs');
const os = require('os');
const path = require('path');
const _ = require('lodash');
const uuidv4 = require('uuid/v4');

const picturesAbsolutePath = 'C:\\Users\\Erik\\workspace\\SinStim\\SamplePictures';

let insertScript = '';

const categories = fs.readdirSync(picturesAbsolutePath);
_.forEach(categories, (category) => {
    const files = fs.readdirSync(path.join(picturesAbsolutePath, category));
    _.forEach(files, (fileName) => {
        insertScript +=
        `
        INSERT INTO [dbo].[PICTURES]
            ([ID], [PATH], [FILE_NAME], [CATEGORY])
        VALUES
            ('${uuidv4()}', 'pictures/', '${fileName}', '${category}')
        GO
        `
    });
});

fs.writeFile('insertPictureData.sql', insertScript, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log('Script Generated!');
});

