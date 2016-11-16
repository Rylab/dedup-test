# dedup-test
This is a simple test of some basic node.js functionality and npm package management, to deduplicate an array of lead data in a given json file.

Requirements:
 * node.js v0.10.30 or greater
 * data to deduplicate in a file named leads.json, located in the current directory

Running:
 * node dedup.js

Notes:
 * Logging is currently done to stdout using Node's built-in console logging. Can easily be upgraded to use Winston or similar.
 * The clean deduplicated dataset is written out to leads-clean.json -- this can easily be changed to match any updated specs.
