import fileparse from './parsers/fileparse.js';
import useFormatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatter = 'tree') => {
    const fileContent1 = fileparse(filepath1);
    const fileContent2 = fileparse(filepath2);
    const result = useFormatter(fileContent1, fileContent2, formatter);
    return result;
}

export default genDiff;