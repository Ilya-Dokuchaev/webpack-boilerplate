const webpackConfiguration = require('../webpack.config');
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizer = require("css-minimizer-webpack-plugin")

const {merge} = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = merge(webpackConfiguration, {
    mode: 'production',
    devtool: false,
    output: {
        filename: "js/mini.[name].[contenthash].bundle.js",
        assetModuleFilename: "[name].[contenthash][ext]"
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            parallel: true
        }),
            new CssMinimizer({})],

    },
    module: {
        rules: [
            {
                test: /\.(png|gif|jpe?g|svg|eot|ttf|woff|woff2)$/i,
                type: 'asset',
                generator: {
                    filename: 'img/design/[name].[contenthash][ext]',
                }
            }
        ]
    },
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/mini.[name].[contenthash].css',
        }),
    ]
})