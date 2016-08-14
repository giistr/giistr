var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var env = process.env.NODE_ENV;
var HtmlWebpackPlugin = require('html-webpack-plugin');

var html = {
  template: 'index.ejs',
  style: 'css/style.css',
  script: 'main.js'
};

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
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      }
    ],
    preLoaders: [
      {
        test: /\.tsx?$/,
        loader: 'tslint'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/style.css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"' + env + '"'
      }
    }),
    new HtmlWebpackPlugin(html)
  ]
};
