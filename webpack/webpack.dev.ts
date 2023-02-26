import webpack from 'webpack';
import { merge } from 'webpack-merge';
import commonConfig from './webpack.common';
import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server';

const isDevMode = process.env.NODE_ENV === 'development';

const devConfig: webpack.Configuration = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: '9988',
    compress: false,
    hot: true,
    // open: true,
    // liveReload: true,
    static: {
      directory: path.join(__dirname, "../public"), //托管静态资源public文件夹
    }
  },
  module: {
    rules: [
      {
        test: /\.m?(tsx|ts)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                ['@babel/preset-env'],
                ['@babel/preset-react'],
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