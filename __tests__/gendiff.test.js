import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src/index.js';

const getFixturePath = (filename) => {
  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  return path.join(currentDir, '..', '__fixtures__', filename);
};

test('gendiff basic test', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = `{
  - follow: false
    host: codica.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(gendiff(file1, file2)).toBe(expected);
});
