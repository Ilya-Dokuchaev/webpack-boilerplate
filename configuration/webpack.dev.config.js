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
            logging: 'warn'
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