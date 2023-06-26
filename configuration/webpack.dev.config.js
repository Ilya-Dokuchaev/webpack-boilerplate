const path = require("path");
const enviroment = require("./enviroment");

const {merge} = require('webpack-merge')
const webpackConfiguration = require('../webpack.config');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(webpackConfiguration, {
    mode: 'development',
    output: {
        path: enviroment.paths.output,
    },
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.resolve(enviroment.paths.output)
        },
        ...enviroment.server,
        hot: true,
        open: true
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
        })
    ]
})