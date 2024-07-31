module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          components: './src/components',
          enums: './src/enums',
          services: './src/services',
          typesScren: './src/types',
          screens: './src/screens',
          navigation: './src/navigation',
          interfaces: './src/interfaces',
          utils: './src/utils',
          store: './src/store',
          hooks: './src/hooks',
        },
      },
    ],
  ],
};
