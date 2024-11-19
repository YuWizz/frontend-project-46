import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff tests', () => {
  const filePath1 = getFixturePath('file1.json');
  const filePath2 = getFixturePath('file2.json');

  test('Compare files stylish default', () => {
    const expectedOutput = readFixture('expected_stylish.txt');
    const output = genDiff(filePath1, filePath2, 'stylish');
    expect(output).toEqual(expectedOutput);
  });

  test('Compare files plain', () => {
    const expectedOutput = readFixture('expected_plain.txt');
    const output = genDiff(filePath1, filePath2, 'plain');
    expect(output).toEqual(expectedOutput);
  });

  test('Compare files JSON', () => {
    const diff = genDiff(filePath1, filePath2, 'json');
    const parsedDiff = JSON.parse(diff);

    expect(parsedDiff).toBeInstanceOf(Object);
    expect(parsedDiff).toHaveProperty('common');
    expect(parsedDiff.common).toHaveProperty('children');
  });

  test('Check uncorrect files', () => {
    const invalidFilePath = getFixturePath('invalid.json');
    expect(() => genDiff(invalidFilePath, filePath2)).toThrow(/Unexpected token/i);
  });  

  test('Check unavailable file', () => {
    const nonExistentPath = getFixturePath('non_existent.json');
    expect(() => genDiff(nonExistentPath, filePath2)).toThrow(/ENOENT/i);
  });

  test('Stylish default', () => {
    const expectedOutput = readFixture('expected_stylish.txt');
    const output = genDiff(filePath1, filePath2);
    expect(output).toEqual(expectedOutput);
  });

  test('Compare YAML files', () => {
    const filePathYaml1 = getFixturePath('file1.yml');
    const filePathYaml2 = getFixturePath('file2.yml');
    const expectedOutput = readFixture('expected_stylish.txt');

    const output = genDiff(filePathYaml1, filePathYaml2, 'stylish');
    expect(output).toEqual(expectedOutput);
  });

  test('Compare JSON & YAML files', () => {
    const filePathYaml = getFixturePath('file2.yml');
    const expectedOutput = readFixture('expected_stylish.txt');

    const output = genDiff(filePath1, filePathYaml, 'stylish');
    expect(output).toEqual(expectedOutput);
  });
});
