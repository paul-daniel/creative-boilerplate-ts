import path from 'path';
import { merge } from 'webpack-merge';
import config from './webpack.config';

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

export default merge([config, devConfig]);
