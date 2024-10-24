#!/usr/bin/env node

const { program } = require('commander');

program
    .version('1.0.0')
    .argument('<filepath1> <filepath2>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .parse(process.argv);
