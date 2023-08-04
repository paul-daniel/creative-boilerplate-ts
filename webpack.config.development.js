const path = require('path');
const { merge } = require('webpack-merge');

const config = require('./webpack.config');

const devConfig = {

  mode: 'development',

  devtool: 'inline-source-map',

  devServer: {
    writeToDisk: true,
    port: 3000,
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
};

module.exports = merge([config, devConfig]);
