const merge = require("webpack-merge");
const webpack = require("webpack");
const baseConfig=require("./webpack.base.config");
module.exports=merge(baseConfig,{
    output: {
        publicPath: "../../"//设置通过HtmlWebpackPlugin打包出来的文件的相对路径
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
});