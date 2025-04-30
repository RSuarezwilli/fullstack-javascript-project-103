import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

describe('gendiff', () => {
  describe('Default (stylish)', () => {
    test('should compare JSON files correctly', () => {
      const file1 = getFixturePath('file1.json');
      const file2 = getFixturePath('file2.json');
      const expected = readFile('stylish-result.txt');
      expect(gendiff(file1, file2)).toBe(expected);
    });

    test('should compare YAML files correctly', () => {
      const file1 = getFixturePath('file1.yaml');
      const file2 = getFixturePath('file2.yaml');
      const expected = readFile('stylish-result.txt');
      expect(gendiff(file1, file2)).toBe(expected);
    });
  });

  describe('Plain format', () => {
    test('should generate plain output for JSON', () => {
      const file1 = getFixturePath('file1.json');
      const file2 = getFixturePath('file2.json');
      const expected = readFile('plain-result.txt');
      expect(gendiff(file1, file2, 'plain')).toBe(expected);
    });
  });

  describe('JSON format', () => {
    test('should generate JSON output', () => {
      const file1 = getFixturePath('file1.json');
      const file2 = getFixturePath('file2.json');
      const expected = readFile('json-result.json');
      expect(gendiff(file1, file2, 'json')).toBe(expected);
    });
  });

  test('should throw error for unsupported format', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    expect(() => gendiff(file1, file2, 'invalid-format')).toThrow('Unknown format: invalid-format');
  });
});