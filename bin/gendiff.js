#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { program } = require('commander');

const parseFile = (filePath) => {
    const fullPath = path.resolve(process.cwd(), filePath);
    const fileData = fs.readFileSync(fullPath, 'utf-8');
    return JSON.parse(fileData);
};

program
    .version('1.0.0')
    .arguments('<filepath1> <filepath2>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .action((filepath1, filepath2) => {
        const data1 = parseFile(filepath1);
        const data2 = parseFile(filepath2);
        console.log(data1, data2);
    });

program.parse(process.argv);
