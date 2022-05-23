const {join, parse} = require('path');
const { readdir, stat } = require('node:fs/promises');
const filePath = path => join(__dirname, path);

readdir(filePath('secret-folder'), {withFileTypes: true})
  .then(files => {
    files = files.filter(f => f.isFile());
    for(let file of files) {
      const PATH_FILE = filePath(`./secret-folder\\${file.name}`);
      const PARSED_FILE = parse(PATH_FILE);
      stat(PATH_FILE).then(file => {
        console.log(`${PARSED_FILE.name} -- ${PARSED_FILE.ext.slice(1)} -- ${file.size}b`);
      });
    }
  });