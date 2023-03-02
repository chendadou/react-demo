import webpack from 'webpack';
import { merge } from 'webpack-merge';
import commonConfig from './webpack.common';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

import { PurgeCSSPlugin } from 'purgecss-webpack-plugin';
import glob from "glob";

import CompressionPlugin from 'compression-webpack-plugin';

const src = path.join(__dirname, "../src");

const prodConfig: webpack.Configuration = merge(commonConfig, {
  mode: 'production',
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,    // webpack5 内置，无需再安装依赖 clean-webpack-plugin
    publicPath: '/',
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    // 'react-router': 'ReactRouter',
    // 'react-router-dom': 'ReactRouterDOM',
    'antd': 'antd',
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
            return !source.includes('index.html');
          }
        }
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css'
    }),

    // 清理无用 css
    new PurgeCSSPlugin({
      paths: glob.sync(`${src}/**/*`, { nodir: true }),

      // TODO: 之后再了解这两个参数具体怎么用
      safelist: [],
      blocklist: []
    }),

    // 打包生成 gzip 插件
    new CompressionPlugin({
      test: /\.(js|css)$/,          // 只生成 css, js 压缩文件
      filename: '[path][base].gz',  // 文件命名
      algorithm: 'gzip',            // 压缩格式，默认是gzip
      threshold: 10240,             // 只有大小大于该值的资源会被处理。默认值是 10k
      minRatio: 0.8                 // 压缩率,默认值是 0.8
    })
  ],
  optimization: {
    minimizer: [

      // 压缩css，该配置导致 webpack 内置插件 terser-webpack-plugin 压缩 js 失效
      new CssMinimizerPlugin(),

      // 压缩js，terser-webpack-plugin 自定义配置
      new TerserPlugin({
        parallel: true,                   // 开启多线程压缩，默认是 true，这边不写也行
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"],  // 删除console.log
          }
        },
      }),
    ],

    // 分隔代码
    splitChunks: {
      cacheGroups: {
        vendors: {                // 提取 node_modules 代码
          test: /node_modules/,   // 只匹配 node_modules 里面的模块
          name: 'vendors',        // 提取文件命名为 vendors, js 后缀和 chunkhash 会自动加
          minChunks: 1,           // 只要使用一次就提取出来
          chunks: 'initial',      // 只提取初始化就能获取到的模块，不管异步的
          minSize: 0,             // 提取代码体积大于0就提取出来
          priority: 1,            // 提取优先级为1
        },
      }
    }
  },
});

export default prodConfig;