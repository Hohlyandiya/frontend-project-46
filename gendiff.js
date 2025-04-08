// @ts-check

import { Command } from 'commander';
import fileparse from './src/parsers/fileparse.js';
import tree from './src/formatters/tree/tree.js';
import plain from './src/formatters/plain/plain.js';
import useFormatter from './src/formatters/index.js';
import json from './src/formatters/json/json.js';

const genDiff = (filepath1, filepath2, formatter = 'tree') => {
    const fileContent1 = fileparse(filepath1);
    const fileContent2 = fileparse(filepath2);
    const result = useFormatter(fileContent1, fileContent2, formatter);
    return result;
}

const program = new Command();

program
.description('Compares two configuration files and shows a difference.')
.arguments('<filepath1> <filepath2>')
.option('-V, --version', 'output the version number')
.option('-f, --format [type]', 'output format')
.helpOption('-h, --help', 'output usage information')
.action((filepath1, filepath2, options) => {
    const fileContent1 = fileparse(filepath1);
    const fileContent2 = fileparse(filepath2);
    if (options.format === 'plain') {
        console.log(plain(fileContent1, fileContent2));
    } else if (options.format === 'json') {
        console.log(json(fileContent1, fileContent2));
    } else {
        console.log(tree(fileContent1, fileContent2));
    };
})
//.parse();

export default genDiff;