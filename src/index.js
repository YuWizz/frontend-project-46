const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const parseFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const fileData = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(fileData);
};
  
const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);
  
  const result = sortedKeys.map((key) => {
    if (!(key in data1)) {
      return `  + ${key}: ${data2[key]}`;
    }
    if (!(key in data2)) {
      return `  - ${key}: ${data1[key]}`;
    }
    if (data1[key] !== data2[key]) {
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    }
    return `    ${key}: ${data1[key]}`;
  });

    return `{\n${result.join('\n')}\n}`;
};
  
module.exports = genDiff;
