const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";

module.exports = (env) => ({
  entry: path.resolve(__dirname, "src/root-config"),
  output: {
    publicPath: isProd ? "/mf-root-config/" : "",
    filename: "mf-demo-root-config.js",
    libraryTarget: "system",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "sourcemap",
  module: {
    rules: [
      { parser: { system: false } },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    host: "0.0.0.0",
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: "src/index.ejs",
      filename: "index.html", // main entry point
      templateParameters: {
        isLocal: env && env.isLocal === "true",
      },
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: "src/index.ejs",
      filename: "404.html", // fallback for GitHub Pages routing
      templateParameters: {
        isLocal: env && env.isLocal === "true",
      },
    }),
    new CleanWebpackPlugin(), // Clean before every new build
  ],
  externals: ["single-spa", /^@mf-demo\/.+$/], // Don’t build and bundle these; load externally
});
