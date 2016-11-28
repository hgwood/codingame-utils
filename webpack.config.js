const webpack = require('webpack')

module.exports = {
  entry: {
    index: './src/index'
  },
  output: {
    path: '.',
    filename: '[name].js',
    library: 'utils'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel']
      }
    ]
  },
  plugins: [ new webpack.optimize.UglifyJsPlugin() ]
}
