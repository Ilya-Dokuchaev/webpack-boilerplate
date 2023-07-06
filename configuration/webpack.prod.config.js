// const webpackConfiguration = require('../webpack.config');
import configMain from "../webpack.config.js";
// const TerserPlugin = require('terser-webpack-plugin')
import TerserPlugin from "terser-webpack-plugin";
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
// const {merge} = require('webpack-merge')
import {merge} from "webpack-merge";
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
import MiniCssExtractPlugin from "mini-css-extract-plugin";


const configProd = merge(configMain, {
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
            new CssMinimizerPlugin({})],

    },
    module: {
        rules: [
            {
                test: /\.(png|gif|jpe?g|svg|eot|ttf|woff2?)$/i,
                type: 'asset',
                generator: {
                    filename: 'img/design/[name].[contenthash][ext]',
                }
            },
        ]
    },
    performance: {
        assetFilter: (assetFileName) => !assetFileName.match(/\.(jpe?g|png|gif|)$/i),
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/mini.[name].[contenthash].css',
        }),
    ]
})
export default configProd