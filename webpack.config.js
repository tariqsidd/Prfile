const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const modeConfiguration = env => require(`./build-utils/webpack.${env}`)(env);
require('dotenv').config({ path: './.env' });
module.exports = ({ mode } = { mode: "production" }) => {
    console.log(`mode is: ${mode}`);

    return merge({
        mode,
        entry: "./src/index.js",
        devServer: {
          historyApiFallback: true,
          static: path.resolve(__dirname, './dist'),
          open: true,
          hot: true,
          compress: true,
        },
        output: {
            publicPath: "/",
            path: path.resolve(__dirname, "build"),
            filename: "bundle.js"
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                },
              {
                test: /\.css$/,
                use: [
                  { loader: "style-loader" },
                  { loader: "css-loader" }
                ]
              }
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html"
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
              "process.env": JSON.stringify(process.env)
            })
        ],
    },
        modeConfiguration(mode)
    );
};
