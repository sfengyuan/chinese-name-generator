const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const PRODUCTION_ASSETS_URL = 'https://sfengyuan.github.io/chinese-name-generator/'

const publicPath = () => process.env.mode === 'production' ? PRODUCTION_ASSETS_URL : '/'

const config = {
  mode: process.env.mode,

  entry: {
    index: './src/index.js'
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name][ext][query]'
  },

  devtool: 'inline-source-map',

  // devServer: {
  //   static: './dist'
  // },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './src/index.html'
    })
  ],

  module: {
    rules: [
      { test: /\.(png|svg|jpg|jpeg|gif|mp4|webp)$/i, type: 'asset/resource' },
      { test: /\.less$/i,
        use: [
          process.env.mode === 'development' ?
            "style-loader" :
            {
              loader: MiniCssExtractPlugin.loader,
              options: { publicPath: publicPath() }
            },

          "css-loader",
          "postcss-loader",
          {
            loader: "less-loader",
            options: { lessOptions: { strictMath: true } }
          }
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  }
}

if (process.env.mode === 'production') {
  config.output.publicPath = publicPath()
  config.plugins = config.plugins.concat([new MiniCssExtractPlugin()])
}

module.exports = config
