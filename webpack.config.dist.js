/**
 * Created by Abaddon on 25.04.2015.
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        './src/js/index.js'
    ],
    output: {
        filename: './dist/index.js',
        sourceMapFilename: './dist/index.map',
        libraryTarget: 'umd',
        library: 'PaginationBox'
    },
    externals: [{
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        }
    }],
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [
            {test: /\.js$/, exclude: [/node_modules/], loader: 'babel-loader'}
        ]
    }
};
