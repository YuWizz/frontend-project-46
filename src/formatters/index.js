import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

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

export default formatDiff;
