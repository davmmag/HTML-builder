const {join, parse} = require('path');
const { readdir, stat } = require('node:fs/promises');
const filePath = path => join(__dirname, path);

readdir(filePath('secret-folder'), {withFileTypes: true})
  .then(files => {
    files = files.filter(f => f.isFile());
    for(let file of files) {
      const pathFile = filePath(`./secret-folder\\${file.name}`);
      const parsedFile = parse(pathFile);
      stat(pathFile).then(file => {
        console.log(`${parsedFile.name} -- ${parsedFile.ext.slice(1)} -- ${file.size}b`);
      });
    }
  });