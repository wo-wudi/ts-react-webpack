/*
 * @Author: LiCW
 * @Date: 2021-09-17 10:14:49
 * @LastEditTime: 2021-09-18 15:31:31
 * @LastEditors: LiCW
 * @Description: webpack的公共配置
 * @FilePath: \react-webpack-ts-project\webpack\webpack.common.conf.js
 */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
/** 提取公共代码 */
const commonCSS = [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"];

/** tree shaking 去除无用的代码
 *前提：es6的模块化，开启production环境
 *减少代码体积
 *添加package.json配置
 *可能对css有影响
 *"sideEffects":["*.css","*.scss"]
*/

module.exports = {
  //入口文件
  entry: "./src/index.tsx",
  //输出
  output: {
    //输出得目录位置，必须使用绝对路径
    //使用绝对路径拼接 __dirname+'/dist'
    path: path.resolve(__dirname, "dist"),
    //hash 每次webpack构建的时候，会生成一个唯一的hash值
    //chunkhash 更快chunk生成的hash的值，如果打包源于同一个chunk，那么hash值是一样的
    //contenthash 根据文件内容生成的hash
    filename: "js/bundle.[contenthash:10].js",
  },
  // 加载器：默认webpack只能处理js和json文件，其他文件都需要使用加载器
  module: {
    rules: [
      {
        test: /\.css$/,
        // 使用postcss-loader
        use: [...commonCSS],
      },
      // {
      //   test: /\.less$/,
      //   use: [...commonCSS, "less-loader"],
      // },
      // {
      //   test: /\.scss$/,
      //   use: [...commonCSS, "sass-loader"],
      // },
      {
        test: /\.(js|ts|jsx|tsx)$/,
        // 排除node_modules
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', 
          options: {
            "plugins":[["import", { "libraryName": "antd", "style": "css" }]], // `style: true` 会加载 less 文件],
            presets: ["@babel/preset-env"],
              //开启缓存
            cacheDirectory: true,
          },
        }
      },
      {
        //检测如果是图片文件
        test: /\.(jpg|png|gif|woff|svg|ttf)$/,
        use:[{
          loader: "url-loader",
          // 设置配置项
          options: {
            // 如果小于8kb使用base64处理
            // base64
            // 优点 减少对服务器的请求，减轻服务器的压力
            // 缺点 体积会变大
            limit: 8 * 1024,
            // 取hash值的前10位（文件名）
            //ext保留原来的后缀名
            name: "[name].[ext]",
            outputPath: "img", //设置图片打包后输出的目录
          },
        }],
      },
      {
        test: /\.html$/,
        use:[{
          loader: "html-loader",
          options: {
            //关闭es6模块化
            esModule: false,
          },
        }],
      },
      {
        //打包其他资源(排除哪些文件)
        exclude: /\.(css|js|tsx|jsx|ts|html|less|scss|jpg|png|gif|woff|svg|ttf)$/,
        use:[{
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "fonts",
          },
        }],
      },
    ]
  },
  plugins: [
    //打包html
    new HtmlWebpackPlugin({
      template: "./public/index.html", //打包的html文件的模板
      filename: "index.html", //打包后的文件名称
    }),
    //将css提取到一个独立的文件
    new MiniCssExtractPlugin({
      filename: "css/style.[contenthash:10].css",
    }),
    //压缩CSS
    new CssMinimizerWebpackPlugin(),
  ],
  // 文件引用不需要后缀名
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'] 
  },
  // 从webpack5开始新增的
  target: "web", //目标是针对网页
}