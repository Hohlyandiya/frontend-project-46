// @ts-check

import { genDiff } from "../gendiff.js";
import { fileURLToPath } from 'url';
import { test, expect } from "@jest/globals";
import path from 'path';
import {JSONparse, YAMLparse} from '../src/parsers/fileparse.js'
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readContentFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const fileContent = (filename) => filename.split('.').at(-1) === 'json' ? JSONparse(getFixturePath(filename)) : YAMLparse(getFixturePath(filename));

test.each([
  ['file1.json', 'file2.json', 'result.txt'],
  ['file1.yaml', 'file2.yaml', 'result.txt'],
  ['file1.yml', 'file2.yml', 'result.txt']
])('genDiff', (filepath1, filepath2, result) => {
  expect(genDiff(fileContent(filepath1), fileContent(filepath2))).toBe(readContentFile(result));
});

