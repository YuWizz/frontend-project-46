import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const getFileData = (filePath) => {
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const format = path.extname(filePath).slice(1);
  return { rawData, format };
};

const buildDiffTree = (data1, data2) => {
  const keys = _.orderBy(_.union(Object.keys(data1), Object.keys(data2)));

  return keys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, type: 'nested', children: buildDiffTree(data1[key], data2[key]) };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key, type: 'updated', oldValue: data1[key], newValue: data2[key],
      };
    }
    return { key, type: 'unchanged', value: data1[key] };
  });
};

export { buildDiffTree, getFileData };
