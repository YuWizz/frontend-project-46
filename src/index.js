import parseFile from './parsers';
import buildDiffTree from './utils';
import formatDiff from './formatters/index';

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const data1 = parseFile(filePath1);
  const data2 = parseFile(filePath2);
  const diffTree = buildDiffTree(data1, data2);

  return formatDiff(diffTree, format);
};

export default genDiff;
