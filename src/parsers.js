const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const parseFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(fullPath, 'utf-8');
  const ext = path.extname(filepath);

  if (ext === '.json') {
    return JSON.parse(data);
  }
  if (ext === '.yml' || ext === '.yaml') {
    return yaml.load(data);
  }
  
  throw new Error(`Unsupported file format: ${ext}`);
};

module.exports = parseFile;