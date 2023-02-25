import webpack from 'webpack';
import { merge } from 'webpack-merge';
import commonConfig from './webpack.common';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const prodConfig: webpack.Configuration = merge(commonConfig, {
  mode: 'production',
  plugins: [
    new BundleAnalyzerPlugin(),
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
});

export default prodConfig;