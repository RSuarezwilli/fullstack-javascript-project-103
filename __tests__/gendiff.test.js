import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gendiff from '../src/index.js';  // ejemplo de importación

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('gendiff basic test', () => {
  expect(gendiff('file1.json', 'file2.json')).toBe('expected diff result');
});
