var fs = require('fs');
var file = __dirname + '/leads.json';
var clean = { leads: [] };

fs.readFile(file, 'utf8', function (err, filedata) {
  if (err) {
    console.log('Error: could not read leads.json file; ' + err);
    return;
  }

  filedata = JSON.parse(filedata);
  
  if (!filedata.leads || filedata.leads.constructor !== Array) {
    console.log('Error: leads.json does not follow expected format; "leads" property must be an array of lead objects.');
    return;
  }

  // Loop through all leads, adding them to the clean array after checking whether there is a duplicate in the growing clean output.
  // Replace that previously recorded entry with this newer one, unless the existing record had a newer entryDate.
  filedata.leads.map(function (lead) {
    var cleanLead = true;
    for (var i = 0; i < clean.leads.length; i++) {
      if (lead._id === clean.leads[i]._id || lead.email === clean.leads[i].email) {
        var firstDate = new Date(clean.leads[i].entryDate);
        var dupDate = new Date(lead.entryDate);
        if (dupDate.getTime() >= firstDate.getTime()) {
            console.log('DUPLICATE DETECTED. Removing older element:');
            console.dir(clean.leads[i]);
            console.log('In favor of newer partial duplicate:');
            console.dir(lead);
            clean.leads.splice(i, 1);
        }
        else {
          cleanLead = false;
        }
        break;
      }
    }

    if (cleanLead) {
      // no dup found (yet); push this element into the clean array
      clean.leads.push(lead);
    }
  });

  fs.writeFileSync(__dirname + '/leads-clean.json', JSON.stringify(clean, null, ' '));
});
