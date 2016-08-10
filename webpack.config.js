var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports={
    entry: {
        index: [
            './src/js/App.tsx'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/",
        filename: 'js/[name].js'
    },
    devtool: 'source-map',
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
        "react": "React",
        "react-dom": "ReactDOM"
    },      
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            except: ['exports', 'require']
        }),
        new ExtractTextPlugin('css/[name].css')              
    ],    
};