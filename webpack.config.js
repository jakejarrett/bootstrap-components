/** Dependencies **/
var Webpack = require("webpack");
var path = require("path");

/** Paths **/
var srcPath = path.resolve(__dirname, "src");
var nodeModulesPath = path.resolve(__dirname, "node_modules");
var buildPath = path.resolve(__dirname, "public", "assets/js");

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var autoprefixer = require("autoprefixer");
var precss = require("precss");

var config = {
    context: __dirname,
    devtool: "source-map",

    entry: [
        "babel-polyfill",
        "webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr",
        path.resolve(srcPath, "main.js")
    ],

    output: {
        path: buildPath,
        filename: "[name].js",
        publicPath: "/assets/js/"
    },

    module: {

        rules: [
            {
                enforce: "pre",
                test: /\.json$/,
                loader: "json-loader"
            },

            {
                /** Compiles ES6 to ES5 **/
                test: /\.js$/,
                loader: "babel-loader?babelrc=true",
                exclude: [nodeModulesPath]
            },

            {
                /** Support importing .html templates **/
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                /** Compiles SASS and then Import the Compiled CSS **/
                test: /\.scss$/,
                loader: ["style-loader", "css-loader?modules&importLoaders=1&localIdentName", "postcss-loader", "sass-loader?sourceMap"]
            }
        ]
    },

    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: path.resolve(buildPath, "../css/[name].min.css")
        }),
        new Webpack.LoaderOptionsPlugin({
            postcss: function() {
                return [autoprefixer, precss];
            }
        }),
        new Webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ],

    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "public")
        ],
        extensions: [".js"],
        alias: {
            "marionette": "backbone.marionette",
            "underscore": "lodash",

            /**
             * Convenience
             */
            "app": path.resolve(srcPath, "app"),
            "modules": path.resolve(srcPath, "modules"),
            "Bootstrap": path.resolve(__dirname, "node_modules/bootstrap/js/src")
        }
    }
};

module.exports = config;
