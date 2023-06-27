const path = require('path')


const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const enviroment = require('./configuration/enviroment.js')
module.exports = {
    entry: {
        app: path.resolve(enviroment.paths.source, 'js', 'app.js')
    },
    output: {
        path: enviroment.paths.output,
        clean: true
    },
    module: {
        rules: [
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
                test: /\.(png|gif|jpe?g|svg|webp)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: enviroment.limits.images,
                    },
                },
                generator: {
                    filename: 'img/design/[name].[hash:6][ext]',
                },
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: enviroment.limits.images,
                    },
                },
                generator: {
                    filename: 'img/design/[name].[hash:6][ext]',
                },
            },
        ]
    },
    optimization: {
        minimizer: [
            '...',
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        // Lossless optimization with custom option
                        // Feel free to experiment with options for better result for you
                        plugins: [
                            ['gifsicle', {interlaced: true}],
                            ['jpegtran', {progressive: true}],
                            ['optipng', {optimizationLevel: 5}],
                            // Svgo configuration here https://github.com/svg/svgo#configuration
                            [
                                'svgo',
                                {
                                    plugins: [
                                        {
                                            name: 'removeViewBox',
                                            active: false,
                                        },
                                    ],
                                },
                            ],
                        ],
                    },
                },
            }),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/template.html",
            title: "Webpack App",
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(enviroment.paths.source, 'img', 'favicon_package'),
                    to: path.resolve(enviroment.paths.output, 'img', 'favicon_package'),
                    toType: 'dir'
                },

                {
                    from: path.resolve(enviroment.paths.source, 'img', 'content'),
                    to: path.resolve(enviroment.paths.output, 'img', 'content'),
                    toType: 'dir'
                },


            ]
        })
    ]
}