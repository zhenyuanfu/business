const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const px2rem = require('postcss-px2rem');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const internalIp = require("internal-ip");
let globmaths = glob.sync("./src/views/*/index.js", {
    nodir: true,
});
let entry = {};
globmaths.forEach(function (filePath) {
    let filename = filePath.slice(12, -3);
    entry[filename] = filePath;
});
let htmlPlugins = [];
// console.log(entry);
for (var filename in entry) {
    let pageName = filename.slice(0, filename.indexOf("/"));
    // console.log(pageName);
    htmlPlugins.push(
        new HtmlWebpackPlugin({
            filename: `build/views/${pageName}.html`,
            template: './template.html',
            inject: true,
            hash: false,
            chunks: [filename]
        })
    );
}
module.exports = {
    context: path.resolve(__dirname, './'),
    entry: entry,
    output: {
        path: path.resolve(__dirname, "./"),
        filename: "build/js/[name].[chunkhash].js"
    },
    module: {
        rules: [
            {
                test: /\.vue/,
                use: [{
                    loader: "vue-loader",
                    options: {
                        js: 'babel-loader',
                        extractCSS: true,
                        css: ExtractTextPlugin.extract('vue-style-loader', 'css-loader', 'sass-loader'),
                        // css: 'vue-style-loader!css-loader',
                        postcss: [require('autoprefixer'), px2rem({ remUnit: 75 })]
                    }
                }]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [require('autoprefixer'), px2rem({ remUnit: 75 })];
                                }
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url-loader',
                query: {
                    context: path.resolve(__dirname, './src'),
                    limit: 1,
                    publicPath: "../../../",
                    // path: path.join(__dirname,"build/images"),
                    name: "build/[path][name].[ext]",
                }
            },
        ],
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    plugins: [
        new ExtractTextPlugin('./build/css/[name].[contenthash].css'),
        ...htmlPlugins
    ],
    devtool: 'eval-source-map',
    devServer: {
        // contentBase: path.resolve(__dirname, "./build/"),
        host: internalIp.v4.sync(),
        port: 8088
    }
};