const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader', 
        exclude: '/node_modules/'
      }
    ]
  },
  devServer: {
    port: 3000,
    contentBase: './dist'
  }
}