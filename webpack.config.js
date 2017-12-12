const webpack = require("webpack"),
      path = require("path");

const nodeEnv = process.env.NODE_ENV || "development";

let webpackConfig = {
  entry: path.join(__dirname, "src/client/index.js"),
  output: {
    path: path.join(__dirname, "public/bundle"),
    filename: "index.js"
  },
  devtool: "source-map",
  target: "web",
  resolve: {
    modules: [
      path.join(__dirname, "lib"),
      path.join(__dirname, "src"),
      path.join(__dirname, "node_modules")
    ],
    extensions: [".js", ".jsx"],
    alias: {
      lib: path.join(__dirname, "lib")
    }
  },
  plugins: [
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        include: [
          path.join(__dirname, "lib"),
          path.join(__dirname, "src/client"),
        ],
        query: {
          presets: ["babel-preset-react", "babel-preset-es2015", "babel-preset-stage-0"].map(require.resolve)
        }
      },
      {
        test: /\.json/,
        loader: "json-loader"
      },
      {
        test: /\.(css|pcss)$/,
        include: [
          path.join(__dirname, "lib"),
          path.join(__dirname, "src/client"),
        ],
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1
            }
          }, {
            loader: "postcss-loader",
            options: {
              plugins: (loader) => [
                require("precss"),
                require("postcss-cssnext"),
                require("lost"),
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: "url-loader?limit=8192"
      }
    ]
  }
};

if (nodeEnv === "production") {
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMaps: true,
      mangle: true,
      screwIe8: true,
      comments: false
    })
  );
}

module.exports = webpackConfig;
