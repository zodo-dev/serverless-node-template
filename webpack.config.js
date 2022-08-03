const ZipPlugin = require("zip-webpack-plugin");
const path = require("path");
const { name } = require("./package.json");

const config = {
  target: "node",
  entry: {
    handler: "./src/index.js",
  },
  resolve: {
    preferRelative: true,
  },
  node: false,
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "umd",
  },
  mode: "production",
  optimization: { minimize: true },
};

const pluginConfig = {
  plugins: ["index.js"].map((entryName) => {
    return new ZipPlugin({
      path: path.resolve(__dirname, "dist/"),
      filename: `${name}-handler`,
      extension: "zip",
      include: [entryName],
    });
  }),
};

const webpackConfig = Object.assign(config, pluginConfig);
module.exports = webpackConfig;
