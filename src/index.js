const parseFile = require('./parsers');
const buildDiffTree = require('./utils');
const formatDiff = require('./formatters/index-format');

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const data1 = parseFile(filePath1);
  const data2 = parseFile(filePath2);
  const diffTree = buildDiffTree(data1, data2);

  return formatDiff(diffTree, format);
};

module.exports = genDiff;
