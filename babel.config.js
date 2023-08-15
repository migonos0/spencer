module.exports = {
  plugins: [
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    ['@babel/plugin-proposal-class-properties', {loose: true}],
    [
      'module-resolver',
      {
        alias: {
          'react-native-sqlite-storage': 'react-native-quick-sqlite',
        },
      },
    ],
    'nativewind/babel',
  ],
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
