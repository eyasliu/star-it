import common from './client';
import webpack from 'webpack';

export default {
  ...common,
  entry: {
    client: [
      `webpack-dev-server/client?http://localhost:3000`,
      'webpack/hot/only-dev-server',
      './app/client/index.js'
    ]
  },
  devtool: 'eval',
  plugins: [
    ...common,
    new webpack.HotModuleReplacementPlugin()
  ]
}