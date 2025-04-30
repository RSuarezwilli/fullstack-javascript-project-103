const stringify = (value) => {
    if (typeof value === 'object' && value !== null) {
      return '[complex value]';
    }
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return String(value);
  };
  
  const formatPlain = (diffTree) => {
    const iter = (node, parentPath = '') => {
      const lines = node.flatMap((item) => {
        const currentPath = parentPath ? `${parentPath}.${item.key}` : item.key;
        
        switch (item.type) {
          case 'added':
            return `Property '${currentPath}' was added with value: ${stringify(item.value)}`;
          case 'removed':
            return `Property '${currentPath}' was removed`;
          case 'changed':
            return `Property '${currentPath}' was updated. From ${stringify(item.oldValue)} to ${stringify(item.newValue)}`;
          case 'nested':
            return iter(item.children, currentPath);
          case 'unchanged':
            return [];
          default:
            throw new Error(`Unknown type: ${item.type}`);
        }
      });
      
      return lines.join('\n');
    };
    
    return iter(diffTree);
  };
  
  export default formatPlain;