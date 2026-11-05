const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const site = require("./src/config/site.cjs");

/**
 * Compila el sitio público de Nómada con la base de configuración proporcionada.
 * @param {object} env Variables opcionales recibidas desde Webpack CLI.
 * @param {object} argv Argumentos de ejecución; mode distingue desarrollo y producción.
 * @returns {object} Configuración de Webpack para emitir HTML, JS, CSS y recursos.
 * Los componentes se importan desde main: no necesitan entradas independientes.
 */
module.exports = (env, argv) => {
  const production = argv.mode === "production";

  return {
    mode: production ? "production" : "development",
    devtool: production ? false : "inline-source-map",
    entry: { main: "./src/index.js" },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
      // Rutas relativas: funciona en / y también en /nombre-del-repositorio/.
      publicPath: "",
      clean: true
    },
    target: ["web", "es5"],
    stats: { children: true },
    devServer: {
      static: path.resolve(__dirname, "dist"),
      compress: true,
      port: 8080,
      open: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          // Debe ser una expresión regular, no el texto "/node_modules/".
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"]
        },
        {
          test: /\.(png|svg|jpe?g|gif|webp|woff2?|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: { filename: "assets/[name][ext]" }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/index.html",
        chunks: ["main"],
        scriptLoading: "defer",
        templateParameters: { site },
        favicon: "./src/assets/favicon.svg"
      }),
      new MiniCssExtractPlugin({ filename: "[name].css" })
    ]
  };
};
