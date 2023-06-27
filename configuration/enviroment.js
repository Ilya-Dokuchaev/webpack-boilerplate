const path = require('path')
module.exports = {
    paths: {
        source: path.resolve(__dirname, '../src/'),
        output: path.resolve(__dirname, '../dist/'),
    },
    server: {
        host: 'localhost',
        port: '3000'
    },
    limits: {
        images: 8192,
        fonts: 8192
    }
}