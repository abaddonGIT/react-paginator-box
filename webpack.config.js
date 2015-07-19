/**
 * Created by Abaddon on 25.04.2015.
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        "webpack-dev-server/client?http://localhost:8080",
        'webpack/hot/dev-server',
        './src/js/app'
    ],
    devServer: {
        contentBase: './src/'
    },
    devtool: 'source-map',
    debug: true,
    output: {
        path: path.join(__dirname, 'src/dist'),
        publicPath: '/dist',
        filename: 'bundle.js',
        chunkFilename: '[chunkhash].js',
        sourceMapFilename: 'debugging/[file].map',
        hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
        hotUpdateMainFilename: 'hot/[hash].hot-update.json'
    },
    resolveLoader: {
        modulesDirectories: ['node_modules']
    },
    externals: {
        'react-widgets': 'react-widgets'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
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