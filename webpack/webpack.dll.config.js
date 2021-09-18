//部分第三方库单独打包 减小打包后js的体积
const path = require("path");
const webpack = require("webpack");

const vendors = [
  'antd',
  'axios',
  'react',
  'react-dom',
  'react-router-dom',
  'redux',
  'core-js',
  'regenerator-runtime',
];

module.exports = {
  entry: {
    vendor: vendors,
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dll"),
    library: "[name]", //打包后往外暴露的内容名字
  },
  plugins: [
    // 打包生成manifest.json文件，提供和jquery的映射
    new webpack.DllPlugin({
      name: "[name]", //映射的暴露的内容名字
      path: path.resolve(__dirname, "dll/manifest.json")
    }),
  ],
  mode: "production",
};
