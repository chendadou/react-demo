const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');
const dir = path.resolve(__dirname, 'src');

const isDevMode = process.env.NODE_ENV == 'development';

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]',
    // publicPath: "/",
  },
  devServer: {
    port: 9988,
    compress: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.m?(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
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
        test: /\.(jpg|jpeg|png|gif|svg|woff|woff2|otf|ttf)$/i,
        type: 'asset',
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${dir}/index.html`,
    }),
    new MiniCssExtractPlugin(),
  ]
}
