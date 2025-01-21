#!/usr/bin/env node

import { Command } from 'commander';
import readFile from './src/index.js'

const program = new Command();

program
.description('Compares two configuration files and shows a difference.')
.argument('<filepath1>')
.argument('<filepath2>')
.option('-V, --version', 'output the version number')
.option('-f, --format [type]', 'output format')
.helpOption('-h, --help', 'output usage information')
.action((filepath1, filepath2) => {
    const listFilepath = [filepath1, filepath2];
    listFilepath.map((filepath) => readFile(filepath));
});

program.parse();