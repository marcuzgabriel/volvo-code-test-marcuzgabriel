const webpack = require('webpack');
const path = require('path');
const babelConfig = require('./babel.config');
delete babelConfig.plugins[5][1].alias['^react-native$'];

module.exports = {
  webpack: config => {
    config.module.rules.push(
      ...config.module.rules,
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(js|ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: babelConfig,
          },
        ],
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'pages'),
          path.resolve(__dirname, 'node_modules', 'vcc/ui'),
          path.resolve(__dirname, 'node_modules', 'react-native-gesture-handler'),
          path.resolve(__dirname, 'node_modules', 'react-native-reanimated'),
        ],
        // react-native-web is already compiled.
        exclude: [path.resolve(__dirname, 'node_modules', 'react-native-web')],
      },
    );

    config.plugins.push(
      ...config.plugins,
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        __DEV__: process.env.NODE_ENV === 'development',
      }),
    );

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      '@volvo/public': path.resolve(__dirname, 'public'),
      '@volvo/ui': path.resolve(__dirname, 'src'),
      'react-native$': 'react-native-web',
    };
    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ];
    return config;
  },
};
