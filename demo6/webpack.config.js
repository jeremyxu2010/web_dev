const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        demo6 : __dirname + '/frontend/js/demo6.js'
    },
    output: {
        path: __dirname + '/public',
        publicPath: '/',
        filename: 'js/[name].js',
        hotUpdateMainFilename: 'hot-update/[hash].hot-update.json',
        chunkFilename: 'js/chunks/[name].js',
        hotUpdateChunkFilename: 'hot-update/chunks/[id].[hash].hot-update.js',
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            test:      /\.(js|css|less)($|\?)/i,
            filename: '[file].map'
        }),
        new HtmlWebpackPlugin({
          title: 'demo6',
          filename: 'index.html',
          hash : true,
          chunks : ['demo6']
        })
    ],
    module: {
        loaders: [
            {test: /\.(js|jsx)$/, loaders: ["babel"]}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devtool: 'eval'
};
