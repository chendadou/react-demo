import webpack from 'webpack';
import { merge } from 'webpack-merge';
import commonConfig from './webpack.common';
import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server';

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
  plugins: [
    new ReactRefreshWebpackPlugin(),
  ]
});

export default devConfig;