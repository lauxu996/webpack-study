//在项目下面创建webpack配置文件
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
//安装mini-css-extract-plugin插件进行样式文件的抽离
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

//解析器的封装
loadUse = (loader) => {
  const arr = [
    { loader: MiniCssExtractPlugin.loader },
    { loader: "css-loader" },
    //如果不配置到webpack内部，则创建postcss.config.js;一般像vue以及react都没有这个配置文件,配置如下
    {
      loader: "postcss-loader",
      options: {
        // 配置自动补全css
        postcssOptions: {
          plugins: [
            [
              "autoprefixer",
              {
                overrideBrowserslist: ["last 100 versions"],
              },
            ],
            [
              "postcss-preset-env",
              {
                // Options
              },
            ],
          ],
        },
      },
    },
    { loader: loader },
  ];
  if (!loader) {
    arr.pop(); //如果不传递loader则删除最后一项
  }
  return arr;
};
module.exports = {
  //webpack基于node.js
  mode: "development",
  //配置入口文件
  entry: {
    app: "./src/index.js",
  },
  output: {
    //path的路径为绝对路径
    //_dirname当前代码的绝对路径
    //build表示需要打包成文件夹的名称
    path: path.resolve(__dirname, "../", "build"),
    filename: "[name].[hash:8].js",
    // clean:true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      //将public/index.html文件渲染指导保目录
      template: "./public/index.html", //依据模板
      title: "webpack 神奇之旅",
    }),
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/assets",
          to: "static",
        },
        {
          from: "./public/favicon.ico",
          to: "",
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:8].css",
    }),
  ],
  //module 用来处理各种后缀名不同的文件 ----- 万物皆为模块
  module: {
    rules: [
      {
        test: /\.css$/,
        // use:[//解析器解析规则 --- 从后到前
        //   // {loader: 'style-loader'},
        //   {loader: MiniCssExtractPlugin.loader},
        //   {loader: 'css-loader'}
        // ]
        use: loadUse(),
      },
      {
        test: /\.less$/, // 正则表达式，表示以css为结尾的文件
        // use: [ // 解析器解析规则 ---- 从后到前
        //   // { loader: 'style-loader' },
        //   {loader: MiniCssExtractPlugin.loader},
        //   { loader: 'css-loader' },
        //   { loader: 'less-loader' }
        // ]
        use: loadUse("less-loader"),
      },
      {
        test: /\.stylus$/, 
        use: loadUse('stylus-loader')
      },
    ],
  },
  devServer: {
    port: 8080,
    open:true,
    proxy: {
      '/api': {
        target: 'http://121.89.205.189/api',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
