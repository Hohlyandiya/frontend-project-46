// @ts-check

import { genDiff } from "../gendiff.js";

const firstFileContent = {
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false
  };
const secondFileContent = {
    "timeout": 20,
    "verbose": true,
    "host": "hexlet.io"
  };
const result = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}'

test('genDiff', () => {
  expect(genDiff(firstFileContent, secondFileContent)).toBe(result);
});

