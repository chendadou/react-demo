import webpack from 'webpack';
import { merge } from 'webpack-merge';
import commonConfig from './webpack.common';
import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server';

const devConfig: webpack.Configuration = merge(commonConfig, {
  mode: 'development',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: '9898',
    compress: false,
    hot: true,
    // open: true,
    historyApiFallback: true,

    // 托管静态资源 public 文件夹
    static: {
      directory: path.join(__dirname, "../public"),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?(tsx|ts)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'thread-loader', },
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                ['@babel/preset-env'],
                ['@babel/preset-react', { "runtime": "automatic" }],
                ['@babel/preset-typescript'],
              ],
              plugins: [
                ['@babel/plugin-transform-runtime'],
                ['@babel/plugin-proposal-decorators', { legacy: true },],
                ['@babel/plugin-proposal-class-properties', { loose: true },],

                // silence these warning from babel
                ['@babel/plugin-proposal-private-property-in-object', { loose: true },],
                ['@babel/plugin-proposal-private-methods', { loose: true },],

                ['react-refresh/babel'],
              ]
            }
          },
        ],
      },
    ]
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
  ]
});

export default devConfig;