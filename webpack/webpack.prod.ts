import webpack from 'webpack';
import { merge } from 'webpack-merge';
import commonConfig from './webpack.common';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

const prodConfig: webpack.Configuration = merge(commonConfig, {
  mode: 'production',
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
              ]
            }
          },
        ],
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          // 将 public 文件夹下的文件复制到 dist 文件夹中，忽略 index.html 文件
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
          filter: source => {
            return !source.includes('index.html')
          }
        }
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css'
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // 压缩css
    ],
  },
});

export default prodConfig;