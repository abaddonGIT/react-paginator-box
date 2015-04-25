/**
 * Created by Abaddon on 25.04.2015.
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        "webpack-dev-server/client?http://localhost:8080",
        'webpack/hot/dev-server',
        './examples/index'
    ],
    devServer: {
        contentBase: './examples/'
    },
    devtool: "eval",
    debug: true,
    output: {
        path: path.join(__dirname, 'examples'),
        filename: 'bundle.js'
    },
    resolveLoader: {
        modulesDirectories: ['node_modules']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.IgnorePlugin(/un~$/)
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            { test: /\.css$/, loaders: ['style', 'css']},
            { test: /\.jsx$/, loaders: ['react-hot', 'jsx-loader']}
        ]
    }
};