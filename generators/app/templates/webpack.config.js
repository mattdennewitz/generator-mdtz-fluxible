var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,

  devtool: 'source-map',

  entry: [
    'webpack-hot-middleware/client',
    './client.js'
  ],

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'build.js',
    publicPath: '/assets/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          plugins: [
            ["react-transform", {
              transforms: [{
                transform: "react-transform-hmr",
                imports: ["react"],
                locals: ["module"]
              }]
            }]
          ]
        }
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
  ]
};
