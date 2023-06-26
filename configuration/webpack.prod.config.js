const path = require("path");
const enviroment = require("./enviroment");

const {merge} = require('webpack-merge')
const webpackConfiguration = require('../webpack.config');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(webpackConfiguration, {
    mode: 'production',
    output: {
        path: enviroment.paths.outputProd,
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(enviroment.paths.source, 'img', 'content'),
                    to: path.resolve(enviroment.paths.outputProd, 'img', 'content'),
                    toType: 'dir'
                }
            ]
        })
    ]
})