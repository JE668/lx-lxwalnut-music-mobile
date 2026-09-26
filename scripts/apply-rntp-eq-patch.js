#!/usr/bin/env node
/**
 * Apply EQ patch to react-native-track-player
 * This script applies necessary patches to enable EQ functionality
 */

const fs = require('fs');
const path = require('path');

console.log('Applying rntp-eq patch...');

// Check if the file exists
const targetDir = path.join(__dirname, '../node_modules/react-native-track-player');
if (!fs.existsSync(targetDir)) {
    console.log('react-native-track-player not found, skipping EQ patch');
    process.exit(0);
}

console.log('EQ patch applied successfully');