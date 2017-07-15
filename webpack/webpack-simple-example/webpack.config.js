const webpack = require('webpack');
// const process = require('process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    devtool: "eval-source-map",
    entry: __dirname + "/app/main.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + '/build',//打包后的文件存放的地方
        filename: 'bundle.js'//打包后输出文件的文件名字
    },
    module: {//在配置文件里添加JSON loader
        loaders:[
            {
                test:/\.json$/,
                loader: "json-loader"
            },
            {
                test:/\.js$/,
                exclude: /node_modules/,
                loader:'babel-loader'//在webpack的module部分的loaders里进行配置即可
            },
            {
                test:/\.css$/,
                loader: 'style-loader!css-loader?modules!postcss-loader'//跟前面相比就在后面加上了?modules
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?/,
                loader: 'url-loader?limit=100000&name=./assets/[hash].[ext]',
                // options: {
                //     limit: 100000
                // }
                // query:{
                //     limit: 100000
                // }
            }
        ]        
    },
    // postcss: [
    //     require('autoprefixer')//调用autoprefixer插件
    // ],
    // resolveLoader: {
    //    moduleExtensions: ["-loader"]
    // },
    devServer: {
        contentBase: './build', //本地服务器所加载的页面的所在的目录
        // colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true, //实时刷新
        hot: true
    },
    plugins: [
        new webpack.BannerPlugin('Copyright Flying Unicorns inc.'),//在这个数组中new一个就可以了
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tpl.html'//new一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin()//热加载插件
    ]
};