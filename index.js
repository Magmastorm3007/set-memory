#!/usr/bin/env node
const os = require('os');
const fs = require('fs');

const memoryOptions = {
    '1': 1024,
    '2': 2048,
    '4': 4096,
    '8': 8192,
    '16': 16384,
    '32': 32768,
    '64': 65536
};

const inputMemory = process.argv[2];
let memoryLimit;
let totalMemory = os.totalmem() / (1024 * 1024);

if (inputMemory && memoryOptions[inputMemory]) {
    memoryLimit = memoryOptions[inputMemory];
} else if (inputMemory && !isNaN(inputMemory)) {
    memoryLimit = Number(inputMemory)*1024; 
}
// Check if memory limit is greater than total memory
if (memoryLimit > totalMemory) {
    console.log('Memory limit is greater than total system memory. Setting memory limit to calculated limit.');
    const freeMemory = os.freemem() / (1024 * 1024);
    memoryLimit = Math.floor((freeMemory - 400)); 
}

if (!memoryLimit) {
    console.error('Invalid memory option. Please choose from: 1, 2, 4, 8, 16, 32, 64, or a custom number.');
    process.exit(1);
}

// Append the NODE_OPTIONS setting to the shell configuration file
const shellConfigFile = process.env.SHELL.includes('zsh') ? '.zshrc' : '.bashrc';
fs.appendFileSync(`${process.env.HOME}/${shellConfigFile}`, `export NODE_OPTIONS=--max_old_space_size=${memoryLimit}\n`);

// Log the memory limit and the shell configuration file path
console.log(`Memory limit set to ${memoryLimit} MB`);
console.log(`NODE_OPTIONS setting appended to ${shellConfigFile}, changes will take affect in new sessions`);

// Note: The changes will take effect in new shell sessions.
