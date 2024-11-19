import _ from 'lodash';

const arrayToObject = (array) => _.keyBy(array, 'key');

const json = (diffTree) => {
  const result = arrayToObject(diffTree);
  return JSON.stringify(result, null, 2);
};

export default json;
