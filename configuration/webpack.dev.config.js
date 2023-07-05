const enviroment = require("./enviroment");

const webpackConfiguration = require('../webpack.config');

const {merge} = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = merge(webpackConfiguration, {
    mode: 'development',
    output: {
        filename: "js/[name].bundle.js",
        assetModuleFilename: "[name][ext]"
    },
    devtool: 'eval',
    devServer: {
        static: {
            directory: enviroment.paths.output,
            publicPath: '/',
            watch: false,
        },
        ...enviroment.server,
        hot: true,
        client: {
            overlay: true,
            logging: 'warn'
        },
        compress: true,
        open: true,

    },
    module: {
        rules: [
            {
                test: /\.(png|gif|jpe?g|svg|eot|ttf|woff|woff2)$/i,
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