import stylish from './stylish';
import plain from './plain';
import json from './json';

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
