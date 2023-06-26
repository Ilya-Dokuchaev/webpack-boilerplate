const path = require('path')
module.exports = {
    paths: {
        source: path.resolve(__dirname, '../src/'),
        output: path.resolve(__dirname, '../dist/'),
        outputProd: path.resolve(__dirname, '../public')
    },
    server: {
        host: 'localhost',
        port: '3000'
    },

}