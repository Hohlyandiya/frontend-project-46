// @ts-check

import { Command } from 'commander';
import {JSONparse, YAMLparse} from './src/parsers/fileparse.js';
import _ from 'lodash';

const program = new Command();

const getShiftToTheRight = (obj) => {
    let result = {};
    for (const key in obj) {
        if (obj[key] instanceof Object) {
            result = {...result, [`  ${key}`]: getShiftToTheRight(obj[key])};
            continue;
        }
        result = {...result, [`  ${key}`]: obj[key]}
    }
    return result;
}

const searchDiff = (firstContent, secondContent, distinctiveMark) => {
    let result = {};
        for (const key in firstContent) {
            if (Object.hasOwn(secondContent, key) && firstContent[key] instanceof Object && secondContent[key] instanceof Object) {
                result = {...result, [`  ${key}`]: searchDiff(firstContent[key], secondContent[key], distinctiveMark)};
                continue;
            }
            if (firstContent[key] instanceof Object ) {
                firstContent[key] = getShiftToTheRight(firstContent[key]);
            }
            result = Object.hasOwn(secondContent, key) && secondContent[key] === firstContent[key] ? 
            {...result, [`  ${key}`]: firstContent[key]} : 
            {...result, [`${distinctiveMark} ${key}`]: firstContent[key]};
        }
    return result;
}

const sortContent = (arrData) => {
    const ignoringIndentation = 2;
    const result = Object.keys(arrData)
    .sort((a, b) => {
        const nameA = a.slice(ignoringIndentation);
        const nameB = b.slice(ignoringIndentation );
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    })
    .reduce((acc, key) => {
        acc[key] = arrData[key] instanceof Object ? sortContent(arrData[key]) : arrData[key];
        return acc;
    }, {});
    return result;
}

const stringify = (obj, repeatChar, repeatAmount, deep = 1) => {
    let result = '';
    const leftShift = 2;
    const offsetIndent = deep * repeatAmount - leftShift;
    const indentWithoutOffset = deep * repeatAmount;
    for (const key in obj) {
        if (obj[key] instanceof Object) {
            result = `${result}\n${repeatChar.repeat(offsetIndent)}${key}: {${stringify(obj[key], repeatChar, repeatAmount, deep + 1)}\n${repeatChar.repeat(indentWithoutOffset)}}`;
            continue;
        }
        result = `${result}\n${repeatChar.repeat(deep * repeatAmount - leftShift)}${key}: ${obj[key]}`;
    }
    return result;
}

export const genDiff = (firstFileContent, secondFileContent) => {

    const firstDiffContent = searchDiff(firstFileContent, secondFileContent, '-');
    const secondDiffContent = searchDiff(secondFileContent, firstFileContent, '+');
    const allContent = sortContent(_.merge(firstDiffContent, secondDiffContent));
    return `{${stringify(allContent, ' ', 4)}\n}`;
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
    const index = -1;
    const listFilesContent = listFilepath.map((filepath) => {
        if (filepath.split('.').at(index) === 'yaml' || filepath.split('.').at(index) === 'yml') {
            return YAMLparse(filepath);
        } if (filepath.split('.').at(index) === 'json') {
            return JSONparse(filepath);
        }
        throw new Error('Unsupported file extension');
    });
    const [fileContent1, fileContent2] = listFilesContent;
    console.log(genDiff(fileContent1, fileContent2));
});

//program.parse();