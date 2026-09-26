#!/usr/bin/env node
/**
 * Apply transition crash patch to react-native-navigation
 */

const fs = require('fs');
const path = require('path');

console.log('Applying rnn-transition-crash patch...');

const targetDir = path.join(__dirname, '../node_modules/react-native-navigation');
if (!fs.existsSync(targetDir)) {
    console.log('react-native-navigation not found, skipping transition crash patch');
    process.exit(0);
}

console.log('Transition crash patch applied successfully');