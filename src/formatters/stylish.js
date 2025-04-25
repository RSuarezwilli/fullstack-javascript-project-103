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

const stylish = (tree) => {
  const iter = (node, depth = 1) => {
    const indent = getIndent(depth);
    const bracketIndent = getBracketIndent(depth);

    const lines = node.flatMap((item) => {
      const { key, value, type } = item;

      switch (type) {
        case 'added':
          return `${indent}+ ${key}: ${stringify(value, depth + 1)}`;
        case 'deleted':
          return `${indent}- ${key}: ${stringify(value, depth + 1)}`;
        case 'unchanged':
          return `${indent}  ${key}: ${stringify(value, depth + 1)}`;
        case 'changed':
          return [
            `${indent}- ${key}: ${stringify(value[0], depth + 1)}`,
            `${indent}+ ${key}: ${stringify(value[1], depth + 1)}`,
          ];
        case 'nested':
          return [
            `${indent}  ${key}: {`,
            iter(value, depth + 1),
            `${bracketIndent}}`,
          ];
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });

    return lines.join('\n');
  };

  return `{\n${iter(tree)}\n}`;
};

export default stylish;
