var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var output_options = {
    path: 'public',
    publicPath: '/demo3/',
    filename: 'js/[name].js',
    hotUpdateMainFilename: 'hot-update/[hash].hot-update.js',
    chunkFilename: 'js/chunks/[name].js',
    hotUpdateChunkFilename: 'hot-update/chunks/[id].[hash].hot-update.js',
};

var createHtmlDef = function(opts){
    return new HtmlWebpackPlugin({
        title: 'demo3',
        filename: opts.path,
        template: 'web-src/html/base.html',
        chunks: opts.chunks,
        hash: true,
        inject: false
    });
};

var plugins_options = [
    createHtmlDef({path: 'demo3.html', chunks: ['vendor', 'demo3']}),
    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: Infinity,
    })
];

var entries = {
    demo3 : __dirname + '/web-src/js/entries/demo3.js',
    vendor : ['react', 'react-dom', 'redux', 'react-redux']
};

var loaders = [
    {test: /\.(js|jsx)$/, loaders: ["babel"]},
];

var webpackConfig = {
    entry: entries,
    output: output_options,
    plugins: plugins_options,
    module: {
        loaders: loaders
    }
};

module.exports = webpackConfig;
