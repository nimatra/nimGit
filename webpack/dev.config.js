const path = require('path');
const webpack = require('webpack');
const postCSSConfig = require('./postcss.config');

const host = 'localhost';
const port = 3000;
const customPath = path.join(__dirname, './customPublicPath');
const hotScript = 'webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true';

const baseDevConfig = () => ({
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  entry: {
    nimgit: [customPath, hotScript, path.join(__dirname, '../chrome/extension/nimgit')],
    background: [customPath, hotScript, path.join(__dirname, '../chrome/extension/background')],
  },
  devMiddleware: {
    publicPath: `http://${host}:${port}/js`,
    stats: {
      colors: true,
    },
    noInfo: true,
  },
  hotMiddleware: {
    path: '/js/__webpack_hmr',
  },
  output: {
    path: path.join(__dirname, '../dev/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.prod$/),
    new webpack.DefinePlugin({
      __HOST__: `'${host}'`,
      __PORT__: port,
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: [
            ['@babel/env', {
              targets: {
                browsers: ['Chrome >=59'],
              },
              modules: false,
              loose: true,
            }], '@babel/react'],

          plugins: [
            'react-hot-loader/babel',
            ['import', { libraryName: 'antd', style: 'css' }],
            '@babel/proposal-object-rest-spread',
            '@babel/plugin-proposal-class-properties',
          ],
        },
      }],
    }, {
      test: /\.css$/,
      use: ['style-loader', {
        loader: 'postcss-loader',
        options: postCSSConfig,
      }],
    }],
  },
});

const injectPageConfig = baseDevConfig();
injectPageConfig.entry = [
  customPath,
  path.join(__dirname, '../chrome/extension/inject'),
];
delete injectPageConfig.hotMiddleware;
delete injectPageConfig.module.rules[0].query;
injectPageConfig.plugins.shift(); // remove HotModuleReplacementPlugin
injectPageConfig.output = {
  path: path.join(__dirname, '../dev/js'),
  filename: 'inject.bundle.js',
};
const appConfig = baseDevConfig();

module.exports = [
  injectPageConfig,
  appConfig,
];
