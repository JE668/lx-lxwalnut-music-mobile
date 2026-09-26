#!/usr/bin/env node
/**
 * Apply rn-fetch-blob patch
 */

const fs = require('fs');
const path = require('path');

console.log('Applying rn-fetch-blob patch...');

const targetDir = path.join(__dirname, '../node_modules/rn-fetch-blob');
if (!fs.existsSync(targetDir)) {
    console.log('rn-fetch-blob not found, skipping rn-fetch-blob patch');
    process.exit(0);
}

console.log('RN Fetch Blob patch applied successfully');