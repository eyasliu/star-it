import common from './client';
import webpack from 'webpack';

export default {
  ...common,
  entry: {
    client: [
      './app/client/index.js'
    ]
  },
  plugins: [
    ...common,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false
    })
  ]
}