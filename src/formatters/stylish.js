const getIndent = (depth) => '    '.repeat(depth); // Asegúrate de que la indentación sea consistente

const getValueIndent = (depth) => '    '.repeat(depth).slice(2); // Desplazamiento correcto para valores

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const entries = Object.entries(value);
  const lines = entries.map(
    ([key, val]) => `${getIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`,
  );

  return `{\n${lines.join('\n')}\n${getIndent(depth)}}`;
};

const formatStylish = (diff, depth = 1) => {
  if (!Array.isArray(diff)) {
    throw new Error(`Expected array, got ${typeof diff}`);
  }

  const lines = diff.map((node) => {
    const indent = getValueIndent(depth);

    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'removed':
        return `${indent}- ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'unchanged':
        return `${indent}  ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'changed':
        return [
          `${indent}- ${node.key}: ${stringify(node.oldValue, depth + 1)}`,
          `${indent}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`,
        ].join('\n');
      case 'nested':
        return [
          `${indent}  ${node.key}: {`,
          formatStylish(node.children, depth + 1),
          `${indent}  }`,
        ].join('\n');
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return lines.join('\n');
};

export default (diff) => `{\n${formatStylish(diff)}\n}`;
