const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const {
  ModuleFederationPlugin,
} = require("@module-federation/enhanced/rspack");
const rspack = require("@rspack/core");

module.exports = {
  module: {
    rules: [
      {
        test: /\.png$/,
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              // ...
            },
          },
        ],
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "builtin:lightningcss-loader",
            options: {
              targets: ["ie 10", "chrome >= 87", "edge >= 88", "> 0.5%"],
            },
          },
          // ... other loader
        ],
      },
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
            },
          },
        },
        type: "javascript/auto",
      },
      {
        test: /\.jsx$/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: {
                syntax: "ecmascript",
                jsx: true,
              },
              transform: {
                react: {
                  pragma: "React.createElement",
                  pragmaFrag: "React.Fragment",
                  throwIfNamespace: true,
                  development: false,
                  useBuiltins: false,
                },
              },
            },
          },
        },
        type: "javascript/auto",
      },
      {
        test: /\.js$/,
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              target: "es2015",
            },
            env: {
              targets: [
                "chrome >= 87",
                "edge >= 88",
                "firefox >= 78",
                "safari >= 14",
              ],
            },
            // ...other options
          },
        },
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "postcss-loader",
          },
          {
            loader: "less-loader",
          },
        ],
        type: "css",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                // ...
              },
            },
          },
        ],
        type: "css",
      },
    ],
  },
  devServer: {
    hot: false,
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    ],
  },
  // 模块联邦
  plugins: [
    new ModuleFederationPlugin({
      // options
    }),
    // HtmlRspackPlugin 是以 Rust 实现的高性能 HTML 插件
    new rspack.HtmlRspackPlugin(),
  ],
  experiments: {
    css: true,
  },
  entry: "index.js",
  output: {
    // set uniqueName explicitly to make HMR works
    uniqueName: "app",
    path: path.resolve(__dirname, "./dist"),
    filename: "index_bundle.js",
  },
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin({
        // JS minimizer 配置
      }),
      new rspack.LightningCssMinimizerRspackPlugin({
        // CSS minimizer 配置
      }),
    ],
  },
};
