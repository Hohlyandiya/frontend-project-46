import fileparse from './parsers/fileparse.js';
import useFormatter from './formatters/index.js';
import buildDiff from './buildDiff.js';

const genDiff = (filepath1, filepath2, formatter = 'tree') => {
  const fileContent1 = fileparse(filepath1);
  const fileContent2 = fileparse(filepath2);
  const arrDiff = buildDiff(fileContent1, fileContent2);
  const result = useFormatter(arrDiff, formatter);
  return result;
};

export default genDiff;
