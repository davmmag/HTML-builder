const readline = require('node:readline');
const path = require('node:path');
const fs = require('node:fs');
const {stdin: input, stdout: output, exit} = require('node:process');

const filePath = path.join(__dirname, 'text.txt');
const rl = readline.createInterface({input, output});
const writeStream = fs.createWriteStream(filePath, 'utf-8');
output.write('Hello my little friend\n');
rl.on('line', (input) => (input === 'exit') ? exit() : writeStream.write(input + '\n'));
process.on('exit', () => output.write('Hasta la vista, baby!'));