import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import gendiff from '../src/index.js'; // <-- Solo UN import

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

// Función auxiliar para normalizar saltos de línea (opcional)
const normalize = (str) => str.replace(/\r\n/g, '\n').trim();

test('gendiff basic test', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  // Test para formato stylish (por defecto)
  const expectedStylish = readFile('stylish.result.txt');
  expect(normalize(gendiff(file1, file2))).toEqual(normalize(expectedStylish));

  // Test para formato JSON
  const expectedJson = readFile('json-result.json');
  expect(gendiff(file1, file2, 'json')).toEqual(expectedJson);
});
