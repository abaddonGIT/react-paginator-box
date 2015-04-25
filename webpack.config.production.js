/**
 * Created by Abaddon on 25.04.2015.
 */
var path = require('path');
var webpack = require('webpack');


module.exports = {
    entry: [
        './examples/index'
    ],
    output: {
        path: path.join(__dirname, 'examples'),
        filename: 'bundle.js'
    },
    resolveLoader: {
        modulesDirectories: ['node_modules']
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
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
            { test: /\.css$/, loaders: ['style', 'css']},
            { test: /\.jsx$/, loaders: ['jsx-loader']}
        ]
    }
};