var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var env = process.env.NODE_ENV;

const entries = [ 'whatwg-fetch', path.join(__dirname, 'src/App') ];
if (env === 'dev') {
  entries.concat([ 'webpack/hot/only-dev-server', 'webpack-dev-server/client?http://localhost:3001' ]);
}

module.exports = {
  entry: entries,
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  devtool: 'eval',
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.css', '.html', 'png', 'jpg']
  },
  cache: true,
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
        loader: 'json-loader'
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
        'NODE_ENV': "'" + env + "'"
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
