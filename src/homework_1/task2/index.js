import * as fs from 'fs';
import path from 'path';
import csv from 'csvtojson';
import { pipeline } from 'stream';
import errorHandler from './utils/errorHandler';

console.log('Task 2:');

const csvFilePath = path.resolve(__dirname, 'data', 'node_mentoring_t1_2_input_example.csv');
const jsonFilePath = path.resolve(__dirname, 'data', 'output.txt');

const readStream = fs.createReadStream(csvFilePath);
const transformStream = csv();
const writeStream = fs.createWriteStream(jsonFilePath);

pipeline(
    readStream,
    transformStream,
    writeStream,
    (err) => {
        if (err) {
            errorHandler(err);
        }
    }
);
