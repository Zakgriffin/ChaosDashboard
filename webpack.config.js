// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [
    {
        mode: 'development',
        entry: './src/electron.ts',
        target: 'electron-main',
        module: {
            rules: [{
                test: /\.ts(x?)$/,
                include: /src/,
                use: [{ loader: 'ts-loader' }]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }]
        },
        output: {
            path: __dirname + '/dist',
            filename: 'electron.js'
        },
        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
        }
    },
    {
        mode: 'development',
        entry: './src/react.tsx',
        target: 'electron-renderer',
        devtool: 'source-map',
        module: {
            rules: [{
                test: /\.ts(x?)$/,
                include: /src/,
                use: [{loader: 'ts-loader'}]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }]
        },
        output: {
            path: __dirname + '/dist',
            filename: 'react.js'
        },
        resolve: {
           extensions: ['.js', '.ts', '.tsx'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            })
        ]
    }
]