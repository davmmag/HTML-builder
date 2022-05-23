let fs = require('fs');
const path = require('node:path');
const url = path.join(`${__dirname}\\text.txt`);
const readableStream = fs.createReadStream(url);
readableStream.on('data', (chunk) => console.log(chunk.toString()));
