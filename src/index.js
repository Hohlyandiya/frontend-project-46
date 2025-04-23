import fileparse from './parsers/fileparse.js'
import useFormatter from './formatters/index.js'
import buildDiff from './buildDiff.js'
import { readFileSync } from 'fs'
import path from 'path'
import process from 'process'

const getFileContent = (filepath) => {
  const index = -1
  const currentDir = process.cwd()
  const fileContent = readFileSync(path.resolve(currentDir, filepath))
  const fileExtension = filepath.split('.').at(index)
  return { content: fileContent, extension: fileExtension }
}

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const fileData1 = getFileContent(filepath1)
  const fileData2 = getFileContent(filepath2)
  const fileContent1 = fileparse(fileData1)
  const fileContent2 = fileparse(fileData2)
  const arrDiff = buildDiff(fileContent1, fileContent2)
  const result = useFormatter(arrDiff, formatter)
  return result
}

export default genDiff
