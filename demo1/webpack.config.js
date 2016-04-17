var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var output_options = {
    path: 'public',
    publicPath: '/demo1/',
    filename: 'js/[name].js',
    hotUpdateMainFilename: 'hot-update/[name].[hash].hot-update.js',
    chunkFilename: 'js/chunks/[name].js',
    hotUpdateChunkFilename: 'hot-update/chunks/[name].[hash].hot-update.js',
};

var createHtmlDef = function(opts){
    return new HtmlWebpackPlugin({
        title: 'demo1',
        filename: opts.path,
        template: 'web-src/html/base.html',
        chunks: opts.chunks,
        hash: true,
        inject: false
    });
};

var plugins_options = [
    createHtmlDef({path: 'demo1.html', chunks: ['demo1']})
];

var entries = {
    demo1 : __dirname + '/web-src/js/demo1.js'
};

var webpackConfig = {
    entry: entries,
    output: output_options,
    plugins: plugins_options
};

module.exports = webpackConfig;
