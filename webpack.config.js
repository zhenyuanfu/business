const merge = require("webpack-merge");
const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig=require("./webpack.base.config");
module.exports=merge(baseConfig,{
    output: {
        path: path.resolve(__dirname, "./"),
        filename: "build/js/[name].js"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new ExtractTextPlugin('./build/css/[name].css'),
    ]
});