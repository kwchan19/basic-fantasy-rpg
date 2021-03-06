const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = {
  entry: './src/scripts/game.js',
  output: {
    filename: 'game.bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          filename: '[name].bundle.js'
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({ gameName: 'My Phaser Game', template: 'src/index.html' }),
    new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }, { from: 'src/pwa', to: '' }]),
    new InjectManifest({
      swSrc: path.resolve(__dirname, '../src/pwa/sw.js')
    })
  ]
}
