'use strict';

const HtmlPlugin = require('html-webpack-plugin');
const ProvidePlugin = require('webpack').ProvidePlugin;
const DefinePlugin = require('webpack').DefinePlugin;

// PostCSS plugins
const precss = require('precss');
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');

// Load the CSS in a style tag in development
let cssLoaders = 'style-loader!css-loader?localIdentName=[local]__[path][name]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader?parser=postcss-scss';

module.exports = {
    context: __dirname + '/src',
    entry: './main.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },

    devtool: 'cheap-module-source-map',
    devServer: {
        inline: true,
        historyApiFallback: true,
        stats: 'minimal',
        port: 4200
    },

    module: {
        loaders: [
            {
                // Transform .js and .jsx files required using Babel
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            {
                // Transform our own .css files using PostCSS and CSS-modules
                test: /\.css$/,
                exclude: /node_modules/,
                loader: cssLoaders
            },
            {
                // Do not transform vendor's CSS with CSS-modules
                // The point is that they remain in global scope.
                // Since we require these CSS files in our JS or CSS files,
                // they will be a part of our compilation either way.
                // So, no need for ExtractTextPlugin here.
                test: /\.css$/,
                include: /node_modules/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['', '.js', '.jsx']
    },

    // Process the CSS with PostCSS
    postcss: () => [
        precss(),
        postcssFocus(), // Add a :focus to every :hover
        cssnext({ // Allow future CSS features to be used, also auto-prefixes the CSS...
            browsers: ['last 2 versions', 'IE > 10'] // ...based on this browser list
        }),
        postcssReporter({ // Posts messages from plugins to the terminal
            clearMessages: true
        })
    ],

    plugins: [
        new HtmlPlugin({
            title: 'Rx Composer',
            template: './index.html'
        }),
        new ProvidePlugin({
            React: 'react'
        }),
        new DefinePlugin({
            DEV: true
        })
    ]
};
