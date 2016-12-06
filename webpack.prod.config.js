var Webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var DefinePlugin = new Webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
});
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({ template: 'index.html' });
var UglifyPlugin = new Webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }});
var DedupePlugin = new Webpack.optimize.DedupePlugin();
var CommonChunksPlugin = new Webpack.optimize.CommonsChunkPlugin({ name: 'vendor' });

module.exports = {
  entry: {
    app: './app.js',
    vendor: ['react', 'react-dom'],
  },
  output: {
    filename: '[name].[hash].js',
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
  plugins: [DefinePlugin, HTMLWebpackPluginConfig, UglifyPlugin, DedupePlugin, CommonChunksPlugin]
}