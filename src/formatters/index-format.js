const stylish = require('./stylish');
const plain = require('./plain');
const json = require('./json');

const formatDiff = (diff, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

module.exports = formatDiff;
