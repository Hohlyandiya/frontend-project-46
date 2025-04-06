// @ts-check

import genDiff from "../gendiff.js";
import { fileURLToPath } from 'url';
import { test, expect } from "@jest/globals";
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readContentFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const getFilepath = (filename) =>getFixturePath(filename);

test.each([
  ['file1.json', 'file2.json', 'result.txt'],
  ['file1.yaml', 'file2.yaml', 'result.txt'],
  ['file1.yml', 'file2.yml', 'result.txt']
])('tree', (filepath1, filepath2, result) => {
  expect(genDiff(getFilepath(filepath1), getFilepath(filepath2))).toBe(readContentFile(result));
});

test.each([
  ['file1.json', 'file2.json', 'resultPlain.txt'],
  ['file1.yaml', 'file2.yaml', 'resultPlain.txt'],
  ['file1.yml', 'file2.yml', 'resultPlain.txt']
])('plain', (filepath1, filepath2, result) => {
  expect(genDiff(getFilepath(filepath1), getFilepath(filepath2), 'plain')).toBe(readContentFile(result));
});

