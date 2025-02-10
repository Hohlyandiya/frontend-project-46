// @ts-check

import { genDiff } from "../gendiff.js";
import { fileURLToPath } from 'url';
import { test, expect } from "@jest/globals";
import path from 'path';
import readFile from '../src/file-parse.js'
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readContentFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const firstFileContent = (filename) => readFile(getFixturePath(filename));
const secondFileContent = (filename) => readFile(getFixturePath(filename));
const result = readContentFile('result.txt');

test('genDiff', () => {
  expect(genDiff(firstFileContent('file1.json'), secondFileContent('file2.json'))).toBe(result);
});

