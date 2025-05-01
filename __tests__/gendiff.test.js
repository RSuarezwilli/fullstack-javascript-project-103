import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import gendiff from '../src/index.js'; // <-- Import correcto (asegúrate de la ruta)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();
// const normalize = (str) => str.replace(/\r\n/g, '\n').trim();
test('gendiff basic test', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expected = readFile('stylish.result.txt');
  const received = gendiff(filepath1, filepath2);
  // console.log('Expected:\n', expected);
  // console.log('Received:\n', received);
  // console.log('Expected:', expected);
  // expect(normalize(received)).toEqual(normalize(expected));
  expect(received).toEqual(expected);
});
