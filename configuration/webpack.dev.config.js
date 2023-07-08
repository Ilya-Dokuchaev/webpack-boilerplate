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

// const enviroment = require("./enviroment");
import configEnv from "./enviroment.js";
// const webpackConfiguration = require('../webpack.config');
import configMain from '../webpack.config.js'
// const {merge} = require('webpack-merge')
import {merge} from "webpack-merge"
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const configDev = merge(configMain, {
    mode: 'development',
    output: {
        filename: "js/[name].bundle.js",
        assetModuleFilename: "[name][ext]"
    },
    devtool: 'eval',
    devServer: {
        static: {
            directory: configEnv.paths.output,
            publicPath: '/',
            watch: false,
        },
        ...configEnv.server,
        hot: true,
        client: {
            overlay: true,
        },
        compress: true,
        open: true,

    },
    module: {
        rules: [
            {
                test: /\.(png|gif|jpe?g|svg|eot|ttf|woff2?)$/i,
                type: 'asset',
                generator: {
                    filename: 'img/design/[name][ext]',
                }
            }
        ]
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 300,
        ignored: /node_modules/,
    },

    plugins: [new MiniCssExtractPlugin({
        filename: 'css/[name].css',
    }),]
})
export default configDev