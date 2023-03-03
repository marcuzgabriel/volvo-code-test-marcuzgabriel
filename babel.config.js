module.exports = {
  presets: ['module:@babel/preset-typescript', 'module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-transform-flow-strip-types',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@volvo/ui': './src',
          '@volvo/api': './public/api',
          '@babel/runtime': './node_modules/@babel/runtime',
          '^react-native$': './node_modules/react-native',
          'styled-components': './node_modules/styled-components',
          'react-native-gesture-handler': './node_modules/react-native-gesture-handler',
          'react-native-reanimated': './node_modules/react-native-reanimated',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
