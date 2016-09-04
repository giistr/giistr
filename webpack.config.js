var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var env = process.env.NODE_ENV;

var entries = ['whatwg-fetch', path.join(__dirname, 'src/App')];
var output = {
  filename: 'bundle.js',
  path: path.join(__dirname, 'dist')
};
var toCopy = [
  { from: 'assets', to: 'assets' },
  { from: 'icons', to: 'icons' },
  { from: 'index.html' },
  { from: 'nginx.conf' }
];

var plugins = [
  new webpack.PrefetchPlugin('react'),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: "'" + env + "'"
    }
  })
];

var devtool = '';
var loaders = ['babel', 'ts-loader'];

if (env === 'dev') {
  entries = entries.concat(['webpack/hot/only-dev-server', 'webpack-dev-server/client?http://localhost:3001']);
  output.path = __dirname;
  devtool = 'eval';
  plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
  plugins = plugins.concat([
    new CopyWebpackPlugin(toCopy),
    new webpack.optimize.DedupePlugin()
  ]);
}

module.exports = {
  entry: entries,
  output: output,
  devtool: devtool,
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.css', '.html']
  },
  cache: true,
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: loaders
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
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
