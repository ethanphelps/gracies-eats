const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: path.join(__dirname, './src/index.tsx')
  },
  output: {
    path: path.join(__dirname, "/dist"),
    // publicPath: "./",
    filename: "[name].js",
    clean: true
  },
  mode: "development",
  cache: false,
  devServer: {
    port: 8080,
    hot: true,
    static: {
      directory: path.join(__dirname, "public"), // get assets from here on reload
    },
    liveReload: true,
    watchFiles: [ path.join(__dirname, 'src/**/*') ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./public/favicon.ico"
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {

    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        type: "asset",
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', 'css-loader', 'sass-loader' // webpack processes loaders from right to left
        ]
      } 
    ]
  }
}