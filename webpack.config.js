const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const dir = path.resolve(__dirname, 'src');

// const isDevMode = process.env.NODE_ENV == 'development';

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
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
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${dir}/index.html`,
    }),
  ]
}
