const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const postCSSConfig = require('./postcss.config');

const customPath = path.join(__dirname, './customPublicPath');

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
      }),
    ],
  },
  entry: {
    nimgit: [customPath, path.join(__dirname, '../chrome/extension/nimgit')],
    background: [customPath, path.join(__dirname, '../chrome/extension/background')],
    inject: [customPath, path.join(__dirname, '../chrome/extension/inject')],
  },
  output: {
    path: path.join(__dirname, '../build/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.dev$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
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
};
