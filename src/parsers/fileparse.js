import { readFileSync } from 'fs'
import path from 'path';
import process from 'process';
import yaml from 'js-yaml';

export const JSONparse = (filePath) => {
    const currentDir = process.cwd();
    const fileContent = readFileSync(path.resolve(currentDir, filePath));
    return JSON.parse(fileContent);
};

export const YAMLparse = (filePath) => {
    const currentDir = process.cwd();
    const fileContent = readFileSync(path.resolve(currentDir, filePath));
    return yaml.load(fileContent);
};