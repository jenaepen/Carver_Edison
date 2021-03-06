const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "build")
  },
  devServer: {
    publicPath: "/build/",
    port: 8080,
    proxy: {
      "/": "http://localhost:3000"
    }
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.js|jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css?/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
