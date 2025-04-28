import { readFileSync } from 'fs';
import path from 'path';
import buildDiff from './utils/diff.js';
import stylish from './formatters/stylish.js';
import parse from './parsers/parsers.js';

const getFileContent = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  return readFileSync(absolutePath, 'utf-8');
};

const getFileFormat = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const content1 = getFileContent(filepath1);
  const content2 = getFileContent(filepath2);

  const obj1 = parse(content1, getFileFormat(filepath1));
  const obj2 = parse(content2, getFileFormat(filepath2));

  const diff = buildDiff(obj1, obj2);

  if (format === 'stylish') return stylish(diff);
  throw new Error(`Unsupported format: ${format}`);
};

export default genDiff;
