// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
import gendiff from '../src/index.js'; // ejemplo de importación

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

test('gendiff basic test', () => {
  expect(gendiff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toBe(
    `{
  - follow: false
    host: codica.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`,
  );
});
