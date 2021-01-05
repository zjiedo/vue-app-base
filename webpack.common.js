const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/** @type {import('webpack').Configuration} */
module.exports = {
  // 入口定义
  entry: './src/main.js',
  // 输出定义
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src') // 全局名称
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(vue|js)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            esModule: false, // 默认按es module打包, 导致前端加载不出图片
            limit: 2 * 1024,
            name: 'assets/[name]-[contenthash:8].[ext]'
          }
        }
      },
      {
        test: /\.(ttf|woff)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[name]-[contenthash:8].[ext]'
          }
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all' // 公共模块拆分
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      BASE_URL: '"/"' // 导出的是js字面量
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public', to: '' }
      ]
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'Webpack For Vue'
    })
  ]
}
