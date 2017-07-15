const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
process.env.NODE_ENV = 'production';

module.exports = {
    entry: __dirname + '/app/main.js',
    output: {
        filename: '[name]-[hash].js',
        path: __dirname + '/build'
    },
    module: {
        // loaders: [
        //     {
        //         test: /\.json$/,
        //         loader:'json-loader'
        //     },
        //     {
        //         test: /\.js$/,
        //         exclude: /node_modules/,
        //         loader: 'babel-loader'
        //     },
        //     {
        //         test: /\.css$/,
        //         loader:'style-loader!css-loader?modules!postcss-loader'
        //     }
        // ]
        rules: [
             {
                test: /\.json$/,
                loader:'json-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader?modules!postcss-loader"
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100000,
                            name: './assets/[hash].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tpl.html'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('[name]-[hash].css'),
        new CleanWebpackPlugin(['build'],{
            root:__dirname
        }),
        new CopyWebpackPlugin([
            {
                from:'./app/image/**/*',
                to:'image/[name].[ext]'
            }
        ])
    ]
}