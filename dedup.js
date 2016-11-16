var fs = require('fs');
var file = __dirname + '/leads.json';

fs.readFile(file, 'utf8', function (err, filedata) {
  if (err) {
    console.log('Error reading file: ' + err);
    return;
  }

  filedata = JSON.parse(filedata);

  console.dir(filedata);
});
