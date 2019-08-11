var webpack = require("webpack");
var path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "./lib"),
    filename: "index.js",
    library: "seamless-redux",
    libraryTarget: "umd",
		umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      Actions: path.resolve(path.resolve(__dirname, "./src/actions/")),
      Utils: path.resolve(path.resolve(__dirname, "./src/utils/")),
      Classes: path.resolve(path.resolve(__dirname, "./src/classes/"))
    }
  }
};
