/**
 * Created by Abaddon on 25.04.2015.
 */
var path = require('path');
var webpack = require('webpack');


module.exports = {
    entry: [
        './src/'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js'
    },
    resolveLoader: {
        modulesDirectories: ['node_modules']
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("publish")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loaders: ['jsx-loader']}
        ]
    }
};