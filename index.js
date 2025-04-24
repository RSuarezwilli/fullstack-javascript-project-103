// src/utils/index.js
import gendiff from './src/index.js';

const file1 = './__fixtures__/file1.json';
const file2 = './__fixtures__/file2.json';

export default gendiff;

const result = gendiff(file1, file2);
console.log(result);
