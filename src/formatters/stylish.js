const buildIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const formatValue = (value, depth) => {
  if (typeof value !== 'object' || value === null) return String(value);

  const indent = buildIndent(depth + 1);
  const entries = Object.entries(value);
  const formatted = entries.map(([key, val]) => `${indent}    ${key}: ${formatValue(val, depth + 1)}`);
  return `{\n${formatted.join('\n')}\n${indent}}`;
};

const stylish = (diff, depth = 1) => {
  const indent = buildIndent(depth);
  const result = diff.map((node) => {
    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${formatValue(node.value, depth)}`;
      case 'removed':
        return `${indent}- ${node.key}: ${formatValue(node.value, depth)}`;
      case 'unchanged':
        return `${indent}  ${node.key}: ${formatValue(node.value, depth)}`;
      case 'nested':
        return `${indent}  ${node.key}: {\n${stylish(node.children, depth + 1)}\n${indent}  }`;
      case 'changed':
        return [
          `${indent}- ${node.key}: ${formatValue(node.oldValue, depth)}`,
          `${indent}+ ${node.key}: ${formatValue(node.newValue, depth)}`,
        ].join('\n');
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });
  // return result.join('\n');
};

export default stylish;
