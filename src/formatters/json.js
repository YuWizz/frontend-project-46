import _ from 'lodash';

const json = (diffTree) => {
  const result = _.keyBy(diffTree, 'key');
  return JSON.stringify(result, null, 2);
};

export default json;
