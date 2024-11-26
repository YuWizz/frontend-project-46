const formatValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : String(value);
};
  
const plain = (diffTree) => {
  const iter = (nodes, path) => nodes
    .flatMap((node) => {
      const fullPath = [...path, node.key].join('.');
      switch (node.type) {
        case 'added':
          return `Property '${fullPath}' was added with value: ${formatValue(node.value)}`;
        case 'removed':
          return `Property '${fullPath}' was removed`;
        case 'updated':
          return `Property '${fullPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
        case 'nested':
          return iter(node.children, [...path, node.key]);
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }
    })
    .join('\n');
  
  return iter(diffTree, []);
};
  
export default plain;
  