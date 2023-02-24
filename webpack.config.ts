import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import path from 'path';
const dir = path.resolve(__dirname, 'src');

const isDevMode = process.env.mode === 'development';

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.tsx',
  },
  output: {
    // output.path 在 webpack5 中，以下是其默认值，可移除
    // path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    assetModuleFilename: 'images/[contenthash][ext][query]',
    // publicPath: "/",
  },
  devServer: {
    port: 9988,
    compress: true,
    open: true,
    // liveReload: true,
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
                '@babel/preset-env',
                '@babel/preset-typescript',
                '@babel/preset-react'
              ],
              plugins: [
                '@babel/plugin-transform-runtime',
                [
                  '@babel/plugin-proposal-class-properties',
                  { loose: true }
                ],

                // silence these warning from babel
                [
                  '@babel/plugin-proposal-private-property-in-object',
                  { loose: true }
                ],
                [
                  '@babel/plugin-proposal-private-methods',
                  { loose: true }
                ],
              ]
            }
          },
        ]
      },
      {
        test: /\.css$/i,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|bmp|svg|woff|woff2|otf|ttf)$/i,
        type: 'asset',
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${dir}/index.html`,
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@': path.resolve('src'),
    }
  },
}
