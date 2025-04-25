import { readFileSync } from 'fs';
import path from 'path';
import buildDiff from './utils/diff.js';
import formatStylish from './formatters/stylish.js'; // Cambiado el nombre de formatDiff a formatStylish

export default function genDiff(path1, path2, format = 'stylish') {
  const fullPath1 = path.resolve(path1);
  const fullPath2 = path.resolve(path2);

  const fileContent1 = readFileSync(fullPath1, 'utf-8');
  const fileContent2 = readFileSync(fullPath2, 'utf-8');

  const obj1 = JSON.parse(fileContent1);
  const obj2 = JSON.parse(fileContent2);

  const diff = buildDiff(obj1, obj2);

  // Usamos la función importada (ahora llamada formatStylish)
  switch (format) {
    case 'stylish':
      return formatStylish(diff);
    default:
      return formatStylish(diff);
  }
}
