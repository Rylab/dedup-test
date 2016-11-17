var fs = require('fs');
var file = __dirname + '/leads.json';
var cleanLeads = { leads: [] };

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

  // Compare the _id and email of each lead to all other leads; only put most recent unique leads into the clean output
  filedata.leads.map(function (lead) {
    var leadDate = new Date(lead.entryDate);

    var betterDup = filedata.leads.some(function (otherLead) {
      if (lead._id === otherLead._id || lead.email === otherLead.email) {
        var otherLeadDate = new Date(otherLead.entryDate);
        if (otherLeadDate.getTime() > leadDate.getTime()) {
            console.log('DUPLICATE DETECTED. Removing element with older entryDate:');
            console.dir(lead);
            console.log('In favor of newer partial duplicate:');
            console.dir(otherLead);
            return true;
        }
        if (otherLeadDate.getTime() == leadDate.getTime()) {
            if (filedata.leads.indexOf(lead) == filedata.leads.indexOf(otherLead)) {
                return false; // skip inner loop comparing exact same item (not dup)
            }
            console.log('DUPLICATE ID/EMAIL AND ENTRY DATE DETECTED. Removing element provided sooner in array:');
            console.dir(lead);
            console.log('In favor of partial duplicate:');
            console.dir(otherLead);
            filedata.leads.splice(filedata.leads.indexOf(lead), 1);
            return true;
        }
      }
      // no better dup found yet; can potentially include this element in clean output
      return false;
    });
 
    if (betterDup === false) {
      // entire map searched with no better dup found; include this lead data in clean output
      cleanLeads.leads.push(lead);
    }
  });

  fs.writeFileSync(__dirname + '/leads-clean.json', JSON.stringify(cleanLeads, null, ' '));
});
