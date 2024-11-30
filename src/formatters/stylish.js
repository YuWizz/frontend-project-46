import _ from 'lodash';

const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount);

const stringify = (value, depth, spacesCount = 4) => {
  if (!_.isObject(value)) {
    return String(value);
  }

  const entries = Object.entries(value)
    .map(([key, val]) => `${indent(depth + 1, spacesCount)}${key}: ${stringify(val, depth + 1, spacesCount)}`);
  return `{\n${entries.join('\n')}\n${indent(depth, spacesCount)}}`;
};

const stylish = (diffTree, depth = 1, spacesCount = 4) => {
  const currentIndent = indent(depth, spacesCount).slice(2);
  const bracketIndent = indent(depth - 1, spacesCount);

  const lines = diffTree.map((node) => {
    switch (node.type) {
      case 'added':
        return `${currentIndent}+ ${node.key}: ${stringify(node.value, depth, spacesCount)}`;
      case 'removed':
        return `${currentIndent}- ${node.key}: ${stringify(node.value, depth, spacesCount)}`;
      case 'unchanged':
        return `${currentIndent}  ${node.key}: ${stringify(node.value, depth, spacesCount)}`;
      case 'updated':
        return [
          `${currentIndent}- ${node.key}: ${stringify(node.oldValue, depth, spacesCount)}`,
          `${currentIndent}+ ${node.key}: ${stringify(node.newValue, depth, spacesCount)}`,
        ].join('\n');
      case 'nested':
        return `${currentIndent}  ${node.key}: ${stylish(node.children, depth + 1, spacesCount)}`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};

export default stylish;
