import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff tests', () => {
  const jsonFilePath1 = getFixturePath('file1.json');
  const jsonFilePath2 = getFixturePath('file2.json');
  const yamlFilePath1 = getFixturePath('file1.yml');
  const yamlFilePath2 = getFixturePath('file2.yml');

  test.each([
    ['stylish', 'expected_stylish.txt', jsonFilePath1, jsonFilePath2],
    ['plain', 'expected_plain.txt', jsonFilePath1, jsonFilePath2],
    ['stylish', 'expected_stylish.txt', yamlFilePath1, yamlFilePath2],
    ['stylish', 'expected_stylish.txt', jsonFilePath1, yamlFilePath2],
    [undefined, 'expected_stylish.txt', jsonFilePath1, jsonFilePath2],
  ])('Check file formats & default format', (format, expectedFile, filePath1, filePath2) => {
    const expectedOutput = readFixture(expectedFile);
    const output = format ? genDiff(filePath1, filePath2, format) : genDiff(filePath1, filePath2);
    expect(output).toEqual(expectedOutput);
  });

  test('Compare files JSON', () => {
    const diff = genDiff(jsonFilePath1, jsonFilePath2, 'json');
    expect(() => JSON.parse(diff)).not.toThrow();
  });

  test('Check uncorrect files', () => {
    const invalidFilePath = getFixturePath('invalid.json');
    expect(() => genDiff(invalidFilePath, jsonFilePath2)).toThrow(/Unexpected token/i);
  });

  test('Check unavailable file', () => {
    const nonExistentPath = getFixturePath('non_existent.json');
    expect(() => genDiff(nonExistentPath, jsonFilePath2)).toThrow(/ENOENT/i);
  });
});
