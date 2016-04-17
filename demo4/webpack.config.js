var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isProduction = (process.env.NODE_ENV === 'production');

var output_options = {
    path: 'public',
    publicPath: '/demo4/',
    filename: 'js/[name].js',
    hotUpdateMainFilename: 'hot-update/[hash].hot-update.json',
    chunkFilename: 'js/chunks/[name].js',
    hotUpdateChunkFilename: 'hot-update/chunks/[id].[hash].hot-update.js',
};

var createHtmlDef = function(opts){
    return new HtmlWebpackPlugin({
        title: 'demo4',
        filename: opts.path,
        template: 'web-src/html/base.html',
        chunks: opts.chunks,
        hash: true,
        inject: false,
        minify: isProduction ? {
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true
        } : false
    });
};

var plugins_options = [
    new ExtractTextPlugin('css/[name].css', {allChunks: true}),
    createHtmlDef({path: 'demo4.html', chunks: ['vendor', 'demo4']}),
    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: Infinity,
    })
];

if(!isProduction){
    plugins_options.push(new webpack.SourceMapDevToolPlugin({
        test:      /\.(js|css|less)($|\?)/i,
        filename: '[file].map'
    }));
}

if(isProduction){
    plugins_options.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        output: {
            comments: false
        }
    }));
    plugins_options.push(new webpack.optimize.OccurenceOrderPlugin());
}

if(!isProduction){
    plugins_options.push(new webpack.HotModuleReplacementPlugin());
}

var entries = {
    demo4 : __dirname + '/web-src/js/entries/demo4.js',
    vendor : ['react', 'react-dom', 'redux', 'react-redux']
};

if(!isProduction){
    entries.webpack_dev_client = 'webpack-dev-server/client?http://0.0.0.0:5000';
    entries.webpack_hot_dev_server = 'webpack/hot/only-dev-server';
}

var loaders = [
    {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader', 'eslint-loader', 'strict-loader']
    },{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader" + (isProduction ? '' : '?sourceMap') + "!postcss-loader")
    },{
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader" + (isProduction ? '' : '?sourceMap') + "!postcss-loader!less-loader" + (isProduction ? '' : '?sourceMap'))
    }, {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        loader: "file-loader?&name=font/[name].[ext]"
    }, {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader?limit=8192&name=image/[name].[ext]' + (isProduction ? '!img-loader?optimizationLevel=3&progressive=true' : '')
    }
];

var devServer_options = {
        host : '0.0.0.0',
        port: 5000,
        contentBase: ".",
        progress: true,
        hot: true,
        inline: true,
        stats: { colors: true },
        noInfo: true,
        historyApiFallback: true
};

var webpackConfig = {
    entry: entries,
    output: output_options,
    plugins: plugins_options,
    debug: !isProduction,
    cache: !isProduction,
    watch: !isProduction,
    devServer: devServer_options,
    module: {
        loaders: loaders,
        postcss: function () {
            return [require('autoprefixer')];
        }
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};

if(!isProduction){
    webpackConfig.devtool = 'eval';
}

module.exports = webpackConfig;
