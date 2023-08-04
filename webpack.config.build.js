const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { merge } = require('webpack-merge');
const config = require('./webpack.config');

const buildConfig = {
  mode: 'production',

  output: {
    path: path.join(__dirname, 'dist'),
  },

  plugins: [
    new CleanWebpackPlugin(),
  ],
};

module.exports = merge([config, buildConfig]);
