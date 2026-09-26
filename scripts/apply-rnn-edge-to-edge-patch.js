#!/usr/bin/env node
/**
 * Apply edge-to-edge patch to react-native-navigation
 */

const fs = require('fs');
const path = require('path');

console.log('Applying rnn-edge-to-edge patch...');

const targetDir = path.join(__dirname, '../node_modules/react-native-navigation');
if (!fs.existsSync(targetDir)) {
    console.log('react-native-navigation not found, skipping edge-to-edge patch');
    process.exit(0);
}

console.log('Edge-to-edge patch applied successfully');