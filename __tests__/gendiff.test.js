import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff tests', () => {
  const globalFilePath1 = getFixturePath('file1.json');
  const globalFilePath2 = getFixturePath('file2.json');

  test.each([
    ['stylish', 'expected_stylish.txt'],
    ['plain', 'expected_plain.txt'],
  ])('Compare files stylish & plain', (format, expectedFile) => {
    const expectedOutput = readFixture(expectedFile);
    const output = genDiff(globalFilePath1, globalFilePath2, format);
    expect(output).toEqual(expectedOutput);
  });

  test('Compare files JSON', () => {
    const diff = genDiff(globalFilePath1, globalFilePath2, 'json');
    const parsedDiff = JSON.parse(diff);

    expect(parsedDiff).toBeInstanceOf(Array);
    const commonNode = parsedDiff.find((node) => node.key === 'common');
    expect(commonNode).toBeDefined();
    expect(commonNode).toHaveProperty('children');
  });

  test('Check uncorrect files', () => {
    const invalidFilePath = getFixturePath('invalid.json');
    expect(() => genDiff(invalidFilePath, globalFilePath2)).toThrow(/Unexpected token/i);
  });

  test('Check unavailable file', () => {
    const nonExistentPath = getFixturePath('non_existent.json');
    expect(() => genDiff(nonExistentPath, globalFilePath2)).toThrow(/ENOENT/i);
  });

  test.each([
    ['file1.json', 'file2.json', 'expected_stylish.txt'],
    ['file1.yml', 'file2.yml', 'expected_stylish.txt'],
    ['file1.json', 'file2.yml', 'expected_stylish.txt'],
  ])('Compare YAML & JSON files', (file1, file2, expectedFile) => {
    const filePath1 = getFixturePath(file1);
    const filePath2 = getFixturePath(file2);
    const expectedOutput = readFixture(expectedFile);

    const output = genDiff(filePath1, filePath2, 'stylish');
    expect(output).toEqual(expectedOutput);
  });
});
