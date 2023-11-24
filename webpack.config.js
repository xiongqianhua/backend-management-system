const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        app: "./src/index.tsx"
    },
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, "./dist"),
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                exclude: /(node_modules)/,
                type: 'asset/resource',
                use: [
                    {
                      loader: 'file-loader',
                      options: {
                        name: 'assets/[name].[ext]',
                      },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                exclude: /(node_modules)/,
                type: 'asset/inline',
                use: [
                    {
                      loader: 'file-loader',
                      options: {
                        name: 'assets/[name].[ext]',
                      },
                    },
                ],
            },
            //处理less文件
            {
                test: /\.(less)$/i,
                exclude: /(node_modules)/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },
            //处理scss文件
            {
                test: /\.(scss|css)$/,
                exclude: /(node_modules)/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                    },
                }, 'postcss-loader'],
            },
            {
                test: /\.tsx?$/,
                exclude: /(node_modules)/,
                use: "ts-loader",
                exclude: "/node-modules/"
            },
        ],
    },
    resolve: {
        extensions: ["", ".ts", ".tsx", ".js", ".jsx"],
        alias: {//根据个人喜好配置@指引文件路径
          "@": require("path").resolve(__dirname, "./src"),
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[name].[contenthash:8].css",
        }),      
        new HtmlWebpackPlugin({
            title: "XXX推荐管理平台",//对应打包后html文件 title
            template: path.resolve(__dirname, "./public/index.html"),//html配置路径
            filename: "index.html",
            favicon: path.resolve(__dirname, "./src/favicon.ico")
        }),
        //打包前清除上次打包
        new CleanWebpackPlugin(),
        //命令行友好提示
        new friendlyErrorsWebpackPlugin(),
        new webpack.ProvidePlugin({
            "React": "react",
        }),      
    ],
}