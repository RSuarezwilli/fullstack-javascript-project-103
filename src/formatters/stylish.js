const getIndent = (depth) => '    '.repeat(depth);
const getBracketIndent = (depth) => '    '.repeat(depth - 1);

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const entries = Object.entries(value);
  const lines = entries.map(
    ([key, val]) => `${getIndent(depth)}${key}: ${stringify(val, depth + 1)}`,
  );

  return `{\n${lines.join('\n')}\n${getBracketIndent(depth)}}`;
};

const formatStylish = (diff, depth = 1) => {
  // Asegurar que diff sea un array
  const diffArray = Array.isArray(diff) ? diff : [diff];

  const lines = diffArray.map((item) => {
    if (!item || typeof item !== 'object') {
      return stringify(item, depth);
    }

    const { key, type, value } = item;
    const indent = getIndent(depth - 1).slice(2); // 2 espacios menos para los símbolos

    switch (type) {
      case 'added':
        return `${indent}+ ${key}: ${stringify(value, depth + 1)}`;
      case 'removed':
        return `${indent}- ${key}: ${stringify(value, depth + 1)}`;
      case 'unchanged':
        return `${indent}  ${key}: ${stringify(value, depth + 1)}`;
      case 'changed':
        return [
          `${indent}- ${key}: ${stringify(item.oldValue, depth + 1)}`,
          `${indent}+ ${key}: ${stringify(item.newValue, depth + 1)}`,
        ].join('\n');
      case 'nested':
        return [
          `${indent}  ${key}: {`,
          formatStylish(item.children, depth + 1),
          `${indent}  }`,
        ].join('\n');
      default:
        return `${indent}  ${key}: ${stringify(value, depth + 1)}`;
    }
  });

  return lines.join('\n');
};

export default (diff) => `{\n${formatStylish(diff)}\n}`;
