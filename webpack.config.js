/*
 * Copyright (c) 2023. MIT license
 */

const path = require('path')

// const HtmlWebpackPlugin = require('html-webpack-plugin')
import HtmlWebpackPlugin from "html-webpack-plugin";
// const CopyPlugin = require("copy-webpack-plugin");
import CopyPlugin from "copy-webpack-plugin";

// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
import MiniCssExtractPlugin from "mini-css-extract-plugin";

// const enviroment = require('./configuration/enviroment.js')
import configEnv from "./configuration/enviroment.js";
// const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const configMain = {
    entry: {
        app: path.resolve(configEnv.paths.source, 'js', 'app.js')
    },
    output: {
        path: configEnv.paths.output,
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.ejs$/i,
                use: ['html-loader', 'template-ejs-loader'],
            },
            //js-files loader
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ['@babel/preset-env', {targets: {node: 'current'}}],
                        ],
                    }
                }
            },
            {
                test: /\.((c|sa|sc)ss)$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(png|gif|jpe?g|svg|eot|ttf|woff|woff2)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: configEnv.limits.images,
                    },
                },
            },
        ]
    },
    optimization: {
        runtimeChunk: {
            name: (entrypoint) => `runtimechunk~${entrypoint.name}`,
        },
        minimizer: [
            '...',
            new ImageMinimizerPlugin({
                generator: [
                    {
                        // You can apply generator using `?as=webp`, you can use any name and provide more options
                        preset: "webp",
                        implementation: ImageMinimizerPlugin.squooshGenerate,
                        options: {
                            encodeOptions: {
                                // Please specify only one codec here, multiple codecs will not work
                                webp: {
                                    quality: 90,
                                },
                            },
                        },
                    },
                ],
            }),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/template.ejs",
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(configEnv.paths.source, 'img', 'content'),
                    to: path.resolve(configEnv.paths.output, 'img', 'content'),
                    toType: 'dir',
                },
            ]
        }),
    ],
    resolve: {
        alias: {
            config$: './configs/app-config.js',
        },
        extensions: ['.js', '.jsx'],
        modules: [
            'node_modules',
            'bower_components',
            'shared',
            '/shared/vendor/modules',
        ],
    },
    target: 'web'
}
export default configMain