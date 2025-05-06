import _ from 'lodash';

const getIndentation = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const formatValue = (data, depth, renderFunctions) => {
  // if (!_.isObject(data)) return String(data);
  if (!_.isPlainObject(data)) return String(data);

  const entries = Object.entries(data)
    .map(([key, value]) => renderFunctions.unchanged({ key, value }, depth + 1));

  return `{\n${entries.join('\n')}\n${getIndentation(depth)}  }`;
};

const renderFunctions = {
  root: ({ children }, depth, iterate) => {
    const renderedChildren = children.flatMap((child) => iterate(child, depth + 1));
    return `{\n${renderedChildren.join('\n')}\n}`;
  },
  nested: ({ key, children }, depth, iterate) => {
    const nestedChildren = children.flatMap((child) => iterate(child, depth + 1));
    return `${getIndentation(depth)}  ${key}: {\n${nestedChildren.join('\n')}\n${getIndentation(depth)}  }`;
  },
  added: (node, depth) => `${getIndentation(depth)}+ ${node.key}: ${formatValue(node.value, depth, renderFunctions)}`,
  deleted: (node, depth) => `${getIndentation(depth)}- ${node.key}: ${formatValue(node.value, depth, renderFunctions)}`,
  unchanged: (node, depth) => `${getIndentation(depth)}  ${node.key}: ${formatValue(node.value, depth, renderFunctions)}`,
  changed: (node, depth) => {
    const { key, value1, value2 } = node;
    const formattedValue1 = `${getIndentation(depth)}- ${key}: ${formatValue(value1, depth, renderFunctions)}`;
    const formattedValue2 = `${getIndentation(depth)}+ ${key}: ${formatValue(value2, depth, renderFunctions)}`;
    return [formattedValue1, formattedValue2].join('\n');
  },
};

const renderAST = (ast) => {
  const iterate = (node, depth) => renderFunctions[node.type](node, depth, iterate);
  return iterate(ast, 0);
};

export default renderAST;
