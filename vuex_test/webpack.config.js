'use strict';
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    //指定入口
    entry: {
        main: './main.js'
    },
    output: {
        //资源输出目录
        path: path.join(__dirname, 'dist'),
        filename: 'build.js' //出口的文件名称
    },
    module: {
        loaders: [{
                test: /\.css$/,
                loader: 'style-loader!css-loader!autoprefixer-loader'
            }, {
                test: /\.less$/,
                loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
            }, {
                test: /\.(jpg|ttf|svg|png|eot|woff2|woff|gif)$/,
                loader: 'url-loader?limit=4096' //依赖file-loader
            }, {
                test: /\.js$/,
                loader: 'babel-loader', //依赖babel-core
                //排除路径
                exclude: /node_modules/,
                options: {
                    presets: ['es2015'], //将es6关键字转换成es5
                    plugins: ['transform-runtime'] //es6函数转换
                }
            },
            //处理.vue文件
            {
                test: /\.vue$/,
                loader: 'vue-loader' //vue-loader 依赖于vue-template-compiler
            },
            //处理未来生成到dist目录下才会报错的问题
            {
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015'], //将es6关键字转换成es5
                    plugins: ['transform-runtime'] //es6函数转换
                }
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './index.html',
            //未来移动到dist目录下能够有Index.html文件
            //自动加上引入output中的filename

        }),
        //将jquery声明称全局的变量
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        }),
    ],
    //让单文件的方式也能有template做组件的编译，包会增大30%
    // resolve: {
    //     alias: {
    //         'vue$': 'vue/dist/vue.common.js'
    //     }
    // }
    // 开发环境中使用,webpack-dev-server,     生产环境代码命令:webpack
    devServer: { //webpack自动启动一个Node的服务器帮助你转发
        proxy: {
            '/v2/*': { //请求以/v2/xxxx开头
                target: 'https://api.douban.com/',
                //https://api.douban.com/v2/xxx做代理
                changeOrigin: true,
            }
        }

    }
}
