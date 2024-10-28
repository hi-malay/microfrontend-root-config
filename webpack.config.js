const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = env => ({
  entry: path.resolve(__dirname, "src/root-config"),
  output: {
    publicPath: "/mf-root-config/",
    filename: "mf-demo-root-config.js",
    libraryTarget: "system",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "sourcemap",
  module: {
    rules: [
      { parser: { system: false } },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({ // Optimize Html data in better way to serve it 
      inject: false,
      template: "src/index.ejs",
      templateParameters: {
        isLocal: env && env.isLocal === "true"
      }
    }),
    new CleanWebpackPlugin() // clean before every new build
  ],
  externals: ["single-spa", /^@mf-demo\/.+$/] // Dont build and bundle on webpack take from external 
});
