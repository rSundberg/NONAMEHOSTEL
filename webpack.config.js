const path = require('path')

module.exports = {
    entry: './app/app.js',
    output : {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.bundle.js'
    },
    module : {
        rules: [
            {
                test: /(.js$|.jsx$)/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'postcss-loader']
            }
        ]
    }
}