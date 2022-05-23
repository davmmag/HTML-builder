const { join, parse } = require('node:path');
const { createReadStream } = require('node:fs');
const { readdir, appendFile, rm } = require('node:fs/promises');

const filePath = path => join(__dirname, path);

const readStream = (stream, encoding = 'utf8') => {
  stream.setEncoding(encoding);
  return new Promise((resolve, reject) => {
    let data = '';
    stream.on('data', chunk => (data += chunk));
    stream.on('end', () => resolve(data));
    stream.on('error', error => reject(error));
  });
};

const filterOfFiles = async (path, ext) => {
  const FILES = await readdir(path, {withFileTypes: true});
  return FILES.filter(FILE => FILE.isFile() && ext ===  parse(`${path}/${FILE.name}`).ext);
};

const combineOfFiles = async (input, output, getFiles) => {
  await rm(output, {force: true});
  const FILES = await getFiles;
  for (const FILE of FILES) {
    const DATA = await readStream(createReadStream(`${input}/${FILE.name}`));
    appendFile(output, DATA, 'utf-8');
  }
};

const combineOfCss = async (input, output) => await combineOfFiles(input, output, filterOfFiles(input, '.css'));

combineOfCss(filePath('./styles'), filePath('./project-dist/bundle.css'));