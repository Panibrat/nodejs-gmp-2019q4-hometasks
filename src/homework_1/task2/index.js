import * as fs from 'fs';
import path from 'path';
import csv from 'csvtojson';

console.log('Task 2:');

const csvFilePath = path.resolve(__dirname, 'data', 'node_mentoring_t1_2_input_example.csv');
const jsonFilePath = path.resolve(__dirname, 'data', 'output.txt');

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(jsonFilePath);

readStream.pipe(csv()).pipe(writeStream);
