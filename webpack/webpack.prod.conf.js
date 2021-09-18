/*
 * @Author: LiCW
 * @Date: 2021-09-17 10:15:33
 * @LastEditTime: 2021-09-18 15:32:22
 * @LastEditors: LiCW
 * @Description: webpack生产模式
 * @FilePath: \react-webpack-ts-project\webpack\webpack.prod.conf.js
 */

//引入merge合并方法
const { merge } =require('webpack-merge')
//引入common默认配置
const common = require('./webpack.common.conf')

/** 生产模式打包 */
module.exports = merge(common,{
  //设置sourceMap配置项
  devtool:'cheap-module-source-map',
  //模式：生产模式(production)
  mode: "production",
})