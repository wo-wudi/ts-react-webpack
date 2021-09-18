/*
 * @Author: LiCW
 * @Date: 2021-09-17 10:15:20
 * @LastEditTime: 2021-09-18 15:31:53
 * @LastEditors: LiCW
 * @Description: webpack开发模式
 * @FilePath: \react-webpack-ts-project\webpack\webpack.dev.conf.js
 */

//引入merge合并方法
const { merge } =require('webpack-merge')
//引入common默认配置
const common = require('./webpack.common.conf')
//引入path模块
const path = require("path");

/** 开发模式 */
module.exports = merge(common,{
  //设置sourceMap配置项
  devtool:'eval-cheap-module-source-map',
  //模式：开发模式(development)
  mode: "development",
  //开启服务器
  devServer: {
    // 项目打包后的路径
    contentBase: path.resolve(__dirname, "dist"),
    // 启用gzip压缩
    compress: true,
    //端口设置
    port: 12321,
    //是否自动打开浏览器
    open: true,
    //开启热替换，一旦发生变化，自动打包
    hot: true,
    //跨域
    // proxy: {
    //   "/": {
    //     target: 'http://172.18.0.171:9999/',
    //     changeOrigin: true,     // target是域名的话，需要这个参数，
    //     secure: false,          // 设置支持https协议的代理
    //   }
    // },
  }
})