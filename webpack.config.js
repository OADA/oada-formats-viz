const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: './main.js',
  output: {
    path: path.resolve('dist'),
    filename: 'main.js',
    publicPath: '/'
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'OADA Formats Visualizer',
      template: 'index.template.ejs',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ],

  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      query: {
        presets: [ 'react', 'es2015', 'stage-0' ],
      },
    }],
  },

};
