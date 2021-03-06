const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './source/server.jsx',
  output: {
    filename: 'index.js',
    path: './built/server',
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        exclude: /(node_modules)/,
      },
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /(node_modules)/,
        query: {
          presets: ['latest-minimal', 'react'],
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules'),
      },
    ],
  },
  target: 'node',
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
  },
  plugins: [
    new ExtractTextPlugin('../built/statics/styles.css'),
  ],
};
