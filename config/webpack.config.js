//在项目下面创建webpack配置文件
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = { //webpack基于node.js
  mode:"development",
  //配置入口文件
  entry: {
    app:"./src/index.js"
  },
  output: {
    //path的路径为绝对路径
    //_dirname当前代码的绝对路径
    //build表示需要打包成文件夹的名称
    path: path.resolve(__dirname,"../", "build"),
    filename: "[name].[hash:8].js",
    // clean:true,
  },
  plugins: [
    new HtmlWebpackPlugin({ //将public/index.html文件渲染指导保目录
      template: "./public/index.html", //依据模板
      title: 'webpack 神奇之旅'
    }),
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/assets',
          to: 'static'
        },
        {
          from: './public/favicon.ico',
          to: ''
        }
      ]
    })
  ]
  
}