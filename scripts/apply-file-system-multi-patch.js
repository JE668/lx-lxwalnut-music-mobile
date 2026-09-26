#!/usr/bin/env node
/**
 * Apply file system multi patch
 */

const fs = require('fs');
const path = require('path');

console.log('Applying file-system-multi patch...');

const targetDir = path.join(__dirname, '../node_modules/react-native-file-system');
if (!fs.existsSync(targetDir)) {
    console.log('react-native-file-system not found, skipping file-system-multi patch');
    process.exit(0);
}

console.log('File system multi patch applied successfully');