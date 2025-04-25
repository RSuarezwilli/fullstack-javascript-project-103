const getIndent = (depth) => '    '.repeat(depth);
const getValueIndent = (depth) => '    '.repeat(depth).slice(2);

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const entries = Object.entries(value);
  const lines = entries.map(
    ([key, val]) => `${getIndent(depth)}${key}: ${stringify(val, depth + 1)}`,
  );

  return `{\n${lines.join('\n')}\n${getIndent(depth - 1)}}`;
};

const formatStylish = (diff, depth = 1) => {
  const lines = diff.map((item) => {
    const { key, type } = item;
    const indent = getValueIndent(depth);

    switch (type) {
      case 'added':
        return `${indent}+ ${key}: ${stringify(item.value, depth + 1)}`;
      case 'removed':
        return `${indent}- ${key}: ${stringify(item.value, depth + 1)}`;
      case 'unchanged':
        return `${indent}  ${key}: ${stringify(item.value, depth + 1)}`;
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
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return lines.join('\n');
};

export default (diff) => `{\n${formatStylish(diff)}\n}`;
