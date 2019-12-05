import * as fs from 'fs';
import path from 'path';
import csv from 'csvtojson';
import errorHandler from './utils/errorHandler';
console.log('Task 2:');

const csvFilePath = path.resolve(__dirname, 'data', 'node_mentoring_t1_2_input_example.csv');
const jsonFilePath = path.resolve(__dirname, 'data', 'output.txt');

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(jsonFilePath);

readStream
    .on('error', errorHandler)
    .pipe(csv())
    .on('error', errorHandler)
    .pipe(writeStream)
    .on('error', errorHandler);
