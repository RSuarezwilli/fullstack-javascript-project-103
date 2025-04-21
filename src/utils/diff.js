import path from 'path';
import { readFileSync } from 'fs';

const buildDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = [...new Set([...keys1, ...keys2])].sort();

  const diff = allKeys.map((key) => {
    if (!(key in obj2)) {
      return `  - ${key}: ${obj1[key]}`;
    }
    if (!(key in obj1)) {
      return `  + ${key}: ${obj2[key]}`;
    }
    if (obj1[key] !== obj2[key]) {
      return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
    }
    return `    ${key}: ${obj1[key]}`;
  });

  return `{\n${diff.join('\n')}\n}`;
};

export default function gendiff(filepath1, filepath2) {
  const fullPath1 = path.resolve(filepath1);
  const fullPath2 = path.resolve(filepath2);

  const fileContent1 = readFileSync(fullPath1, 'utf-8');
  const fileContent2 = readFileSync(fullPath2, 'utf-8');

  const obj1 = JSON.parse(fileContent1);
  const obj2 = JSON.parse(fileContent2);

  console.log(buildDiff(obj1, obj2))

  return buildDiff(obj1, obj2);
}