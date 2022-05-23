const { mkdir, readdir, copyFile, rm} = require('node:fs/promises');
const { join } = require('node:path');
const filePath = path => join(__dirname, path);

const copyDir = async (input, output) => {
  await rm(output, { force: true, recursive: true });
  await mkdir(output, { recursive: true });
  const FILES = await readdir(input, {withFileTypes: true});

  for (const FILE of FILES) {

    const INPUT_OF_PATH = `${input}/${FILE.name}`;
    const OUTPUT_OF_PATH = `${output}/${FILE.name}`;

    if(FILE.isDirectory()) {
      await copyDir(INPUT_OF_PATH, OUTPUT_OF_PATH);
    } 
    await copyFile(INPUT_OF_PATH, OUTPUT_OF_PATH);
  }
};
  
copyDir(filePath('./files'), filePath('./files-copy'));
