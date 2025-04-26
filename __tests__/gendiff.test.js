import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs'; // <-- Necesario para leer archivos
import gendiff from '../src/index.js';

// Función para construir la ruta de un fixture
const getFixturePath = (filename) => {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  return path.join(currentDir, '..', '__fixtures__', filename);
};

// Función para leer el contenido de un archivo
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test('gendiff basic test', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFile('expected.txt'); // <-- Ahora lee desde expected.txt

  expect(gendiff(file1, file2)).toEqual(expected); // <-- usamos toEqual
});
