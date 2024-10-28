const path = require('path');
const genDiff = require(path.resolve(__dirname, '../src/index.js'));

const filePath1 = path.join(__dirname, 'file1.json');
const filePath2 = path.join(__dirname, 'file2.json');

test('correctly compares two different JSON files', () => {
  const expectedOutput = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  const output = genDiff(filePath1, filePath2).trim();
  expect(output).toBe(expectedOutput.trim());
});
