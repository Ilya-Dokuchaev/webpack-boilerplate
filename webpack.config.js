const path = require('path')
const fs = require('fs')

const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const enviroment = require('./configuration/enviroment.js')
module.exports = {
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.resolve(enviroment.paths.output)
        },
        port: enviroment.server.port,
        hot: true,
        open: true

    },
    entry: {
        app: path.resolve(enviroment.paths.source, 'js', 'app.js')
    },
    output: {
        filename: "js/[name].js",
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
                            ['@babel/preset-env', {targets: "defaults"}]
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(enviroment.paths.source, 'img', 'content'),
                    to: path.resolve(enviroment.paths.output, 'img', 'content'),
                    toType: 'dir'
                }
            ]
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/template.html",
            title: "Webpack App",
        })

    ]
}