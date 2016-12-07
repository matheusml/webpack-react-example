var Webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var DefinePlugin = new Webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
});
var CleanPlugin = new CleanWebpackPlugin(['static']);
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({ template: 'index.html' });
var UglifyPlugin = new Webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }});
var DedupePlugin = new Webpack.optimize.DedupePlugin();
var CommonChunksPlugin = new Webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'manifest'] });

module.exports = {
  entry: {
    vendor: ['react', 'react-dom'],
    app: './app.js',
  },
  output: {
    path: 'static',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  plugins: [CleanPlugin, DefinePlugin, HTMLWebpackPluginConfig, UglifyPlugin, DedupePlugin, CommonChunksPlugin]
}