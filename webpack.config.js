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
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'postcss-loader']
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name : '[name].[ext]',
                        }
                    }, {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true
                        }
                    }
                ]
            }
        ]
    }
}