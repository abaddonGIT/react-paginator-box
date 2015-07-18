/**
 * Created by Abaddon on 25.04.2015.
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        './src/js/app'
    ],
    debug: true,
    output: {
        path: path.join(__dirname, 'example'),
        filename: 'bundle.js'
    },
    resolveLoader: {
        modulesDirectories: ['node_modules']
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.IgnorePlugin(/un~$/)
    ],
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: [/node_modules/], loader: 'babel-loader?optional=runtime'},
            {test: /\.jsx$/, exclude: [/node_modules/], loaders: ['react-hot', 'babel-loader?optional=runtime']},
            {test: /\.css$/, loader: 'style-loader!css-loader'}
        ]
    }
};