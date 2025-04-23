import fs from 'fs'
import { fileURLToPath } from 'url'
import { test, expect } from '@jest/globals'
import path from 'path'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readContentFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8').trim()
const getFilepath = filename => getFixturePath(filename)

const isJSON = (str) => {
  try {
    JSON.parse(str)
    return true
  }
  catch (e) {
    console.log(e)
    return false
  }
}

test.each([
  ['file1.json', 'file2.json', 'result.txt', 'resultPlain.txt'],
  ['file1.yaml', 'file2.yaml', 'result.txt', 'resultPlain.txt'],
  ['file1.yml', 'file2.yml', 'result.txt', 'resultPlain.txt'],
  ['file1.json', 'file2.yml', 'result.txt', 'resultPlain.txt'],
  ['file1.json', 'file2.yaml', 'result.txt', 'resultPlain.txt'],
  ['file1.yml', 'file2.yaml', 'result.txt', 'resultPlain.txt'],
])('formatters', (filepath1, filepath2, resultStylish, resultPlain) => {
  expect(genDiff(getFilepath(filepath1), getFilepath(filepath2))).toBe(readContentFile(resultStylish))
  expect(genDiff(getFilepath(filepath1), getFilepath(filepath2), 'plain')).toBe(readContentFile(resultPlain))
  expect(isJSON(genDiff(getFilepath(filepath1), getFilepath(filepath2), 'json'))).toBe(true)
})
