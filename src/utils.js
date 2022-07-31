import fs from 'fs'
import * as util from 'util'

const dataPath = process.env.DATA_PATH ?? './data'

fs.access(dataPath, (err) => {
    if (err) {
        fs.mkdir(dataPath, (err) => {
            if (err) {
                console.log(err)
                process.exit(1)
            } else {
                console.log("Data directory created")
            }
        });
    }
});

const readFile = (fileName) => util.promisify(fs.readFile)(fileName, 'utf8');
const writeFile = (fileName, data) => util.promisify(fs.writeFile)(fileName, data, 'utf8');

export {readFile, writeFile, dataPath}