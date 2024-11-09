const stylish = require('./stylish');

const formatDiff = (diff, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return stylish(diff);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

module.exports = formatDiff;
