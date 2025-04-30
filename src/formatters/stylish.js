const getIndentation = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const formatValue = (data, depth, renderFunctions) => {
  if (typeof data !== 'object' || data === null) {
    if (data === null) return 'null';
    if (data === '') return '""';
    return String(data);
  }

  const entries = Object.entries(data)
    .map(([key, value]) => renderFunctions.unchanged({ key, value }, depth + 1, renderFunctions));

  return `{\n${entries.join('\n')}\n${getIndentation(depth)}  }`;
};

// const stylish = (diff, depth = 1) => {
//   const indent = buildIndent(depth);
//   const result = diff.map((node) => {
//     switch (node.type) {
//       case 'added':
//         return `${indent}+ ${node.key}: ${formatValue(node.value, depth)}`;
//       case 'removed':
//         return `${indent}- ${node.key}: ${formatValue(node.value, depth)}`;
//       case 'unchanged':
//         return `${indent}  ${node.key}: ${formatValue(node.value, depth)}`;
//       case 'nested':
//         return `${indent}  ${node.key}: {\n${stylish(node.children, depth + 1)}\n${indent}  }`;
//       case 'changed':
//         return [
//           `${indent}- ${node.key}: ${formatValue(node.oldValue, depth)}`,
//           `${indent}+ ${node.key}: ${formatValue(node.newValue, depth)}`,
//         ].join('\n');
//       default:
//         throw new Error(`Unknown node type: ${node.type}`);
//     }
//   });
//   return result.join('\n');
// };
// export default stylish;

const renderFunctions = {
  root: ({ children }, depth, iterate) => {
    const renderedChildren = children.flatMap((child) => iterate(child, depth + 1));
    return `{\n${renderedChildren.join('\n')}\n}`;
  },
  nested: ({ key, children }, depth, iterate) => {
    const nestedChildren = children.flatMap((child) => iterate(child, depth + 1));
    return `${getIndentation(depth)}  ${key}: {\n${nestedChildren.join('\n')}\n${getIndentation(depth)}  }`;
  },
  added: (node, depth, iterate) => `${getIndentation(depth)}+ ${node.key}: ${formatValue(node.value, depth, iterate)}`,
  removed: (node, depth, iterate) => `${getIndentation(depth)}- ${node.key}: ${formatValue(node.value, depth, iterate)}`,
  unchanged: (node, depth, iterate) => `${getIndentation(depth)}  ${node.key}: ${formatValue(node.value, depth, iterate)}`,
  changed: (node, depth, iterate) => {
    const formattedOld = `${getIndentation(depth)}- ${node.key}: ${formatValue(node.oldValue, depth, iterate)}`;
    const formattedNew = `${getIndentation(depth)}+ ${node.key}: ${formatValue(node.newValue, depth, iterate)}`;
    return [formattedOld, formattedNew].join('\n');
  },
};
const renderAST = (ast) => {
  const iterate = (node, depth) => renderFunctions[node.type](node, depth, iterate);
  return iterate(ast, 0);
};

export default renderAST;
