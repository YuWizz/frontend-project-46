import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiffTree from './utils.js';
import formatDiff from './formatters/index.js';

const getFileData = (filePath) => {
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const format = path.extname(filePath).slice(1);
  return { rawData, format };
};

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const { rawData: rawData1, format: format1 } = getFileData(filePath1);
  const { rawData: rawData2, format: format2 } = getFileData(filePath2);
  const parsedData1 = parse(rawData1, format1);
  const parsedData2 = parse(rawData2, format2);
  const diffTree = buildDiffTree(parsedData1, parsedData2);

  return formatDiff(diffTree, format);
};

export default genDiff;
