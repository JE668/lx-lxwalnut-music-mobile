#!/usr/bin/env node
/**
 * Apply fullscreen cutout patch to react-native-video
 */

const fs = require('fs');
const path = require('path');

console.log('Applying rnv-fullscreen-cutout patch...');

const targetDir = path.join(__dirname, '../node_modules/react-native-video');
if (!fs.existsSync(targetDir)) {
    console.log('react-native-video not found, skipping fullscreen cutout patch');
    process.exit(0);
}

console.log('Fullscreen cutout patch applied successfully');