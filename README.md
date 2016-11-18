# dedup-test
This is a simple test of some basic node.js functionality and npm package management, to deduplicate an array of lead data in a given json file.

Requirements:
 * node.js v0.10.30 or greater
 * data to deduplicate, located in a file named *leads.json* in the current directory, readable by you

Usage:
 * node dedup.js

Output:
 * The clean, deduplicated dataset is written out to *leads-clean.json* in the current directory. This can easily be changed to match updated specs.

Notes:
 * Logging is currently done to stdout using Node's built-in console logging. Can easily be upgraded to use Winston or similar as needed.
 * When there are multiple overlapping partial duplicates, the one with the newest entry date is always preferred.
 * It is possible that some email addresses from the original list which are not duplicated, can be lost in this process, due to duplicate IDs. It is guaranteed that the clean list contains no duplicate emails or IDs, however it is NOT guaranteed that all unique email addresses from the original list are retained in the clean list, depending on their entryDate and ID. The newest record is always retained in these cases, and all partial duplicates are removed.
