var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var output_options = {
    path: 'public',
    publicPath: '/demo2/',
    filename: 'js/[name].js',
    hotUpdateMainFilename: 'hot-update/[name].[hash].hot-update.js',
    chunkFilename: 'js/chunks/[name].js',
    hotUpdateChunkFilename: 'hot-update/chunks/[name].[hash].hot-update.js',
};

var createHtmlDef = function(opts){
    return new HtmlWebpackPlugin({
        title: 'demo2',
        filename: opts.path,
        template: 'web-src/html/base.html',
        chunks: opts.chunks,
        hash: true,
        inject: false
    });
};

var plugins_options = [
    createHtmlDef({path: 'demo2.html', chunks: ['vendor', 'demo2']}),
    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: Infinity,
    })
];

var entries = {
    demo2 : __dirname + '/web-src/js/demo2.js',
    vendor : ['react', 'react-dom']
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
