import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPath = (filename) => path.join(__dirname, '../', '__fixtures__', filename);
const readTestsFiles = (filename) => fs.readFileSync(getPath(filename), 'utf-8').trim();

const stylishResult = readTestsFiles('stylish-result.txt');

const jsonResult = readTestsFiles('json-result.json');
describe('gendiff', () => {
  test('Format for stylish Result - YAML File', () => {
    const filepath1 = getPath('file1-y.yaml');
    const filepath2 = getPath('file2-y.yaml');
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(stylishResult);
  });

  test('Format for JSON Result - JSON File', () => {
    const filepath1 = getPath('file1.json');
    const filepath2 = getPath('file2.json');
    expect(genDiff(filepath1, filepath2, 'json')).toEqual(jsonResult);
  });
});
