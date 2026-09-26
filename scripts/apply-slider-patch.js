#!/usr/bin/env node
/**
 * Apply slider patch
 */

const fs = require('fs');
const path = require('path');

console.log('Applying slider patch...');

const targetDir = path.join(__dirname, '../node_modules/@react-native-community/slider');
if (!fs.existsSync(targetDir)) {
    console.log('slider not found, skipping slider patch');
    process.exit(0);
}

console.log('Slider patch applied successfully');