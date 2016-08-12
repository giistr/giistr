var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    'whatwg-fetch',
    path.join(__dirname, "src/App"),
    "webpack/hot/only-dev-server",
    "webpack-dev-server/client?http://localhost:8080"
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  devtool: 'eval',
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.css', '.html', 'png', 'jpg']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
    ],
    preLoaders: [
      { test: /\.js$/, loader: 'source-map-loader' }
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css')
  ]
};
