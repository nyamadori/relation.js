var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    'relation': './src/index.coffee',
  },

  devtool: 'source-map',

  output: {
    path: 'dist',
    filename: '[name].js',
    library: 'relation',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      { test: /\.coffee$/, loader: 'coffee' }
    ]
  },

  resolve: {
    extensions: ["", ".js", ".coffee"],
    root: [
      path.join(__dirname, 'src')
    ]
  }
};