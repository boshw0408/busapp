const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Reduce file watching by excluding certain directories
config.watchFolders = [__dirname];
config.resolver.blockList = [
  /node_modules\/.*\/node_modules\/react-native\/.*/,
];

module.exports = config;

