/*
 * @Author: qianhua.xiong
 */
const config = require('./webpack.config')

module.exports = Object.assign({}, config, {
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        open: true, //项目启动直接打开
        hot: true, //开启热更新
        port: 8000, //端口号
        static: "./public", //指向静态文件
        historyApiFallback: true,
        proxy: {
          '/api': {
            target: 'http://127.0.0.1',//灰度接口url
            pathRewrite:{'^/api':''},
            secure: false,
            changeOrigin: true,
          },
        }
    },
})
