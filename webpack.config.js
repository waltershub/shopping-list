var webpack = require('webpack');
var path = require('path');

const config = {
  // devtool: 'inline-source-map',

  entry: [
    path.resolve(__dirname, 'src/index.js')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
      use: [{
        loader: 'babel-loader',
      }]
      }
    ],
    loaders: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loaders: ['babel-loader'] }
    ]
  }

};
module.exports = config;
