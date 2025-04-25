import { readFileSync } from 'fs';
import path from 'path';
import buildDiff from './utils/diff.js'; // Importa la función buildDiff desde utils/diff.js

export default function genDiff(path1, path2) {
  const fullPath1 = path.resolve(path1);
  const fullPath2 = path.resolve(path2);

  const fileContent1 = readFileSync(fullPath1, 'utf-8');
  const fileContent2 = readFileSync(fullPath2, 'utf-8');

  const obj1 = JSON.parse(fileContent1);
  const obj2 = JSON.parse(fileContent2);

  console.log(buildDiff(obj1, obj2));

  return buildDiff(obj1, obj2);
}
