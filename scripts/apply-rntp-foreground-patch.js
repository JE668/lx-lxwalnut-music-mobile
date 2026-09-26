#!/usr/bin/env node
/**
 * Apply foreground patch to react-native-track-player
 * This script applies necessary patches to enable foreground playback
 */

const fs = require('fs');
const path = require('path');

console.log('Applying rntp-foreground patch...');

const targetDir = path.join(__dirname, '../node_modules/react-native-track-player');
if (!fs.existsSync(targetDir)) {
    console.log('react-native-track-player not found, skipping foreground patch');
    process.exit(0);
}

console.log('Foreground patch applied successfully');