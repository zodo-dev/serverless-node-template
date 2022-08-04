const ZipPlugin = require("zip-webpack-plugin");
const path = require("path");
const { name } = require("../../package.json");

const serverlessOutputName = name.includes("/") ? name.split("/")[2] : name;
const isProd = process.env?.NODE_ENV === "production";

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
  mode: isProd ? "production" : "development",
  optimization: { minimize: isProd },
};

const pluginConfig = {
  plugins: ["index.js"].map((entryName) => {
    return new ZipPlugin({
      path: path.resolve(__dirname, "dist/"),
      filename: `${serverlessOutputName}-handler`,
      extension: "zip",
      include: [entryName],
    });
  }),
};

const webpackConfig = Object.assign(config, pluginConfig);
module.exports = webpackConfig;
