'use strict';

let HtmlPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let ProvidePlugin = require('webpack').ProvidePlugin;
let DefinePlugin = require('webpack').DefinePlugin;

let postcssImport = require('postcss-import');
let cssNext = require('postcss-cssnext');
var bemLinter = require('postcss-bem-linter');

var path = require('path');


module.exports = {
    entry: {
        main: './src/main.js'
    },
    output: {
        filename: '[name].js'
    },

    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },

    resolve: {
        extensions: ['', '.js', '.jsx', '.css']
    },

    devtool: 'cheap-module-source-map',

    devServer: {
        inline: true,
        historyApiFallback: true,
        stats: 'minimal',
        port: 9000
    },

    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/, loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-1'],
                    plugins: [
                        'transform-decorators-legacy'
                    ]
                }
            },

            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader','css-loader!postcss-loader')
            },

            {
                test: /\.(woff|woff2)$/, loader: 'file-loader?name=fonts/[name].[ext]'
            }

        ],
    },

    postcss: function () {
        return [
            postcssImport({
                path: ['node_modules', './src']
            }),
            cssNext({
                browsers: ['last 2 versions', 'IE > 10']// ...based on this browser list
            }),
            //bemLinter('suit')
        ];
    },

    plugins: [
        new HtmlPlugin({
            title: 'Rx Composer',
            template: './src/index.html'
        }),
        new ExtractTextPlugin('main.css'),
        new ProvidePlugin({
            React: 'react'
        }),
        new DefinePlugin({
            DEV: true
        })
    ]
};