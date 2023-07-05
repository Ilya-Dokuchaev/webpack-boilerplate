const path = require('path')


const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const enviroment = require('./configuration/enviroment.js')
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
module.exports = {
    entry: {
        app: path.resolve(enviroment.paths.source, 'js', 'app.js')
    },
    output: {
        path: enviroment.paths.output,
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
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ['@babel/preset-env']
                        ]
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
                        maxSize: enviroment.limits.images,
                    },
                },
            },
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
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
    performance: {
        assetFilter: (assetFileName) => !assetFileName.match(/\.(jpe?g|png|gif|)$/i)
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/template.ejs",
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(enviroment.paths.source, 'img', 'content'),
                    to: path.resolve(enviroment.paths.output, 'img', 'content'),
                    toType: 'dir',
                },
            ]
        }),
        new CleanWebpackPlugin(),
    ],
    target: 'web'
}