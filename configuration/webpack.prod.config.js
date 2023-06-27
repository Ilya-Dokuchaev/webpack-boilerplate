const webpackConfiguration = require('../webpack.config');
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizer = require("css-minimizer-webpack-plugin")

const {merge} = require('webpack-merge')
module.exports = merge(webpackConfiguration, {
    mode: 'production',
    devtool: false,
    output: {
        filename: "js/mini.[name].[contenthash].bundle.js",

    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            parallel: true
        }),
            new CssMinimizer({})],

    },
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    plugins: []
})