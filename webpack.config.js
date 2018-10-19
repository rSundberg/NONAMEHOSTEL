const webpack = require('webpack')
const path = require('path')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    entry: './app/app.js',
    output : {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
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
                test: /\.(gif|png|jpe?g)$/i,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name : '[name].[ext]',
                        }
                    }, {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: true,
                            mozjpeg: {
                                progressive: true,
                                quality: 50
                            },
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "babel-loader"
                    }, {
                        loader: "react-svg-loader",
                        options: {
                            jsx: true
                        }
                    }
                ]
            }
        ]
    },
    devtool: devMode ? 'cheap-module-eval-source-map' : null,
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}