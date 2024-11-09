const _ = require('lodash');

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (value, depth) => {
  if (!_.isObject(value)) return String(value);

  const entries = Object.entries(value)
    .map(([key, val]) => `${indent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`);
  return `{\n${entries.join('\n')}\n${indent(depth)}  }`;
};

const formatStylish = (diffTree, depth = 1) => {
  const lines = diffTree.map((node) => {
    switch (node.type) {
      case 'added':
        return `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
      case 'removed':
        return `${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
      case 'unchanged':
        return `${indent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
      case 'updated':
        return [
          `${indent(depth)}- ${node.key}: ${stringify(node.oldValue, depth)}`,
          `${indent(depth)}+ ${node.key}: ${stringify(node.newValue, depth)}`,
        ].join('\n');
      case 'nested':
        return `${indent(depth)}  ${node.key}: {\n${formatStylish(node.children, depth + 1)}\n${indent(depth)}  }`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return lines.join('\n');
};

module.exports = formatStylish;
