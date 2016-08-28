var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var env = process.env.NODE_ENV;

var entries = ['whatwg-fetch', path.join(__dirname, 'src/App')];
var output = {
  filename: 'bundle.js',
  path: path.join(__dirname, 'dist')
};
var toCopy = [
  { from: 'assets', to: 'assets' },
  { from: 'index.html' },
  { from: 'nginx.conf' }
];

var plugins = [
  new ExtractTextPlugin('css/style.css'),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: "'" + env + "'"
    }
  })
];

var devtool = '';

if (env === 'dev') {
  entries = entries.concat(['webpack/hot/only-dev-server', 'webpack-dev-server/client?http://localhost:3001']);
  output.path = __dirname;
  toCopy = [];
  devtool = 'eval';
  plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
  plugins = plugins.concat([new CopyWebpackPlugin(toCopy)]);
}

module.exports = {
  entry: entries,
  output: output,
  devtool: devtool,
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
  plugins: plugins
};
