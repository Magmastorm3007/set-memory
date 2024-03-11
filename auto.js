#!/usr/bin/env node
const os = require('os');
const fs = require('fs');
let memoryLimit;
const freeMemory = os.freemem() / (1024 * 1024); 
memoryLimit = Math.floor((freeMemory - 200)); 
// Append the NODE_OPTIONS setting to the shell configuration file
const shellConfigFile = process.env.SHELL.includes('zsh') ? '.zshrc' : '.bashrc';
fs.appendFileSync(`${process.env.HOME}/${shellConfigFile}`, `export NODE_OPTIONS=--max_old_space_size=${memoryLimit}\n`);

// Log the memory limit and the shell configuration file path
console.log(`Memory limit set to ${memoryLimit} MB`);
console.log(`NODE_OPTIONS setting appended to ${shellConfigFile} changes will take affect in new sessions`);

// Note: The changes will take effect in new shell sessions.