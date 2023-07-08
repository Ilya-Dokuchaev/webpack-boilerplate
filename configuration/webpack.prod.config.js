/*
 * MIT License
 *
 * Copyright (c) [year] [fullname]
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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
import {CleanWebpackPlugin} from "clean-webpack-plugin";


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
        new CleanWebpackPlugin(),
    ]
})
export default configProd