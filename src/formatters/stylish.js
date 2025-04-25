const getIndent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);
const getBracketIndent = (depth, spaceCount = 4) => ' '.repeat((depth - 1) * spaceCount);

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const entries = Object.entries(value);
  const lines = entries.map(
    ([key, val]) => `${getIndent(depth)} ${key}: ${stringify(val, depth + 1)}`,
  );

  return ['{', ...lines, `${getBracketIndent(depth + 1)}}`].join('\n');
};

const stylish = (diff, depth = 1) => {
  const indent = getIndent(depth);
  const bracketIndent = getBracketIndent(depth);

  if (!diff || typeof diff !== 'object') {
    return stringify(diff, depth);
  }

  const diffArray = Array.isArray(diff) ? diff : Object.values(diff);

  const lines = diffArray.map((item) => {
    if (!item || typeof item !== 'object') {
      return stringify(item, depth);
    }

    const { key, value, type } = item;

    if (!type) {
      return `${indent}  ${key}: ${stringify(value, depth + 1)}`;
    }

    switch (type) {
      case 'added':
        return `${indent}+ ${key}: ${stringify(value, depth + 1)}`;
      case 'removed':
        return `${indent}- ${key}: ${stringify(value, depth + 1)}`;
      case 'unchanged':
        return `${indent}  ${key}: ${stringify(value, depth + 1)}`;
      case 'changed':
        return [
          `${indent}- ${key}: ${stringify(value.oldValue, depth + 1)}`,
          `${indent}+ ${key}: ${stringify(value.newValue, depth + 1)}`,
        ].join('\n');
      case 'nested':
        return [
          `${indent}  ${key}: {`,
          stylish(item.children, depth + 1),
          `${bracketIndent}}`,
        ].join('\n');
      default:
        return `${indent}  ${key}: ${stringify(value, depth + 1)}`;
    }
  });

  return lines.join('\n');
};

export default (diff) => `{\n${stylish(diff)}\n}`;
