'use strict';

let HtmlPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.js'
    },
    output: {
        filename: '[name].js'
    },

    devtool: 'cheap-module-source-map',
    devServer: {
        inline: true,
        historyApiFallback: true,
        stats: 'minimal',
        port: 9000
    },

    module: {
        preLoaders: [
            {
                test: /\.js$/, loader: 'eslint',
                exclude: /node_modules/
            },
        ],

        loaders: [
            {
                test: /\.js$/, loader: 'babel',
                exclude: /node_modules/
            },

            {
                test: /\.html$/, loader: 'raw'
            },

            {
                test: /\.scss/,
                loader: ExtractTextPlugin.extract('css!postcss!sass')
            }
        ],
    },

    postcss: {
        plugins: [
            require('autoprefixer')
        ]
    },

    resolve: {
        extensions: [ '', '.js', '.scss', '.html' ]
    },

    plugins: [
        new HtmlPlugin({
            title: 'Staffer - Vue',
            template: './index.html'
        }),
        new ExtractTextPlugin('main.css')
    ]
};
