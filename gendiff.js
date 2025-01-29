// @ts-check

import { Command } from 'commander';
import readFile from './src/file-parse.js';
import _ from 'lodash';

const program = new Command();

const searchDiff = (firstContent, secondContent, distinctiveMark) => {
    const result = [];
    for (const [key, value] of Object.entries(firstContent)) {
        if (Object.hasOwn(secondContent, key) && secondContent[key] === value) {
            result.push({[`  ${key}`]: value}); 
        } else {
            result.push({[`${distinctiveMark} ${key}`]: value});
        }
    }
    return result;
}

export const genDiff = (firstFileContent, secondFileContent) => {
    const firstDiffContent = searchDiff(firstFileContent, secondFileContent, '-');
    const secondDiffContent = searchDiff(secondFileContent, firstFileContent, '+');
    const allContent = [...firstDiffContent, ...secondDiffContent];
    
    const result = _.sortBy(allContent, (object) => Object.keys(object)
    .map(element => element.slice(2)))
    .reduce((acc, elem) => Object.assign(acc, elem), {});

    return JSON.stringify(result, null, 2).replace(/"|,/g, '');
};

export const testing = (a, b) => {
    return a + b;
};

program
.description('Compares two configuration files and shows a difference.')
.argument('<filepath1>')
.argument('<filepath2>')
.option('-V, --version', 'output the version number')
.option('-f, --format [type]', 'output format')
.helpOption('-h, --help', 'output usage information')
.action((filepath1, filepath2) => {
    const listFilepath = [filepath1, filepath2];
    const listFilesContent = listFilepath.map((filepath) => readFile(filepath));
    const [fileContent1, fileContent2] = listFilesContent;
    console.log(genDiff(fileContent1, fileContent2));
});

//program.parse();