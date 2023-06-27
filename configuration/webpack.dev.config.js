
const enviroment = require("./enviroment");

const webpackConfiguration = require('../webpack.config');

const {merge} = require('webpack-merge')
module.exports = merge(webpackConfiguration, {
    mode: 'development',
    output: {
        filename: "js/[name].bundle.js",
    },
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: enviroment.paths.output,
            publicPath: '/',
            watch: true,
        },
        ...enviroment.server,
        hot: false,
        client: {
            overlay: true,
        },
        compress: true,
        open: true,

    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 300,
        ignored: /node_modules/,
    },
    plugins: []
})