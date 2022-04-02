const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    }
  }

  if (!isDev) {
    config.minimizer = [
      new TerserWebpackPlugin(),
    ]
  }

  return config
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './script.js',
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.scss'],
  },
  optimization: optimization(),
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: !isDev,
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader'
          }]
        },
      {
        test: /\.(png|jpeg|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      }
    ]
  },
  devServer: {
    port: 4200,
    hot: isDev,
  }
}
