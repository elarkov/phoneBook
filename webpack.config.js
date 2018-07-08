const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const rules = require('./webpack.config.rules')();

rules.push({
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader',
  }),
});

rules.push({
  test: /\.scss$/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader?url=false', 'sass-loader'],
  }),
});

module.exports = {
  entry: {
    index: './src/index.js',
  },
  devServer: {
    index: 'index.html',
  },
  output: {
    filename: 'js/bundle.js',
    path: path.resolve('dist'),
  },
  devtool: 'source-map',
  module: { rules },
  mode: 'none',
  plugins: [
    new ExtractTextPlugin('./css/styles.css'),
    new HtmlPlugin({
      title: 'phoneBook',
      template: 'index.hbs',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new CleanWebpackPlugin(['dist']),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          sourceMap: true,
          compress: {
            drop_debugger: false,
            warnings: false,
          },
        },
      }),
    ],
  },
};
