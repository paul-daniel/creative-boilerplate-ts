const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const IS_DEVELOPMENT = process.env.NODE_ENV === 'dev';

const dirApp = path.join(__dirname, 'app');
const dirAssets = path.join(__dirname, 'assets');
const dirStyles = path.join(__dirname, 'styles');
const dirNode = 'node_modules';

module.exports = {
  entry: {
    main: [path.join(dirApp, 'index.ts'), path.join(dirStyles, 'index.scss')],
    'service-worker': path.join(dirApp, 'service-worker.ts'),
  },

  resolve: {
    modules: [
      dirApp,
      dirAssets,
      dirNode,
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      IS_DEVELOPMENT,
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: './offline.html',
          to: '',
        },
        {
          from: './shared',
          to: '',
        },
      ],
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },

      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },

      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
      },

      {
        test: /\.(jpe?g|png|gif|svg|woff2?|fnt|webp)$/,
        loader: 'file-loader',
        options: {
          name() {
            return '[hash].[ext]';
          },
        },
      },

      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'raw-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'glslify-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
