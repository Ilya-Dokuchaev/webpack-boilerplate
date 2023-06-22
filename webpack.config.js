const path = require('path')
const fs = require('fs')

const CopyPlugin = require('copy-webpack-plugin')


const enviroment = require('./configuration/enviroment.js')
module.exports = {
    entry: {
        app: path.resolve(enviroment.paths.source,'js','app.js')
    },
    output: {
        filename: "js/[name].js",
        path: enviroment.paths.output,
    },
    plugins: [
        new CopyPlugin({
            patterns:[
                {
                    from:path.resolve(enviroment.paths.source,'img','content'),
                    to:path.resolve(enviroment.paths.output,'img','content'),
                    toType:'dir'
                }
            ]
        }),

    ]
}