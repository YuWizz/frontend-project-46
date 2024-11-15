const _ = require('lodash');

const arrayToObject = (array) => _.keyBy(array, 'key');

const json = (diffTree) => {
  const result = arrayToObject(diffTree);
  return JSON.stringify(result, null, 2);
};

module.exports = json;
