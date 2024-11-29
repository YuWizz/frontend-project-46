import parseFile from './parsers.js';
import buildDiffTree from './utils.js';
import formatDiff from './formatters/index.js';

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const data1 = parseFile(filePath1);
  const data2 = parseFile(filePath2);
  const diffTree = buildDiffTree(data1, data2);

  return formatDiff(diffTree, format);
};

export default genDiff;
