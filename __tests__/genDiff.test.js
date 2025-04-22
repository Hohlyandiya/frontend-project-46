import fs from 'fs'
import { fileURLToPath } from 'url'
import { test, expect } from '@jest/globals'
import path from 'path'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)
const readContentFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim()
const getFilepath = (filename) => getFixturePath(filename)

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
  ['file1.json', 'file2.json', 'result.txt'],
  ['file1.yaml', 'file2.yaml', 'result.txt'],
  ['file1.yml', 'file2.yml', 'result.txt'],
  ['file1.json', 'file2.yml', 'result.txt'],
  ['file1.json', 'file2.yaml', 'result.txt'],
  ['file1.yml', 'file2.yaml', 'result.txt']
])('tree', (filepath1, filepath2, result) => {
  expect(genDiff(getFilepath(filepath1), getFilepath(filepath2))).toBe(readContentFile(result))
})

test.each([
  ['file1.json', 'file2.json', 'resultPlain.txt'],
  ['file1.yaml', 'file2.yaml', 'resultPlain.txt'],
  ['file1.yml', 'file2.yml', 'resultPlain.txt'],
  ['file1.json', 'file2.yml', 'resultPlain.txt'],
  ['file1.json', 'file2.yaml', 'resultPlain.txt'],
  ['file1.yml', 'file2.yaml', 'resultPlain.txt']
])('plain', (filepath1, filepath2, result) => {
  expect(genDiff(getFilepath(filepath1), getFilepath(filepath2), 'plain')).toBe(readContentFile(result))
})

test.each([
  ['file1.json', 'file2.json'],
  ['file1.yaml', 'file2.yaml'],
  ['file1.yml', 'file2.yml'],
  ['file1.json', 'file2.yml'],
  ['file1.json', 'file2.yaml'],
  ['file1.yml', 'file2.yaml']
])('json', (filepath1, filepath2) => {
  expect(isJSON(genDiff(getFilepath(filepath1), getFilepath(filepath2), 'json'))).toBe(true)
})
