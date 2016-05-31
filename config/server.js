import webpack from "webpack";
import path from "path";
import fs from "fs";
// import config from './config';

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => nodeModules[mod] = 'commonjs ' + mod)

const webpackConfig = {
  
  entry: {
    server: [
      './app/server/index.js'
    ]
  },
  target: 'node',
  node: {
    __dirname: 'mock',
    __filename: 'mock'
  },
  resolve: {
    alias: {
      root: path.join(__dirname, '../'),
      server: path.join(__dirname, '../app/server')
    }
  },
  externals: nodeModules,
  output: {
    path: path.join(__dirname, '../build'),
    filename: '[name].js',
    publicPath: `/build/`,
    // libraryTarget: "commonjs2"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      }, {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"'
    }),
    new webpack.BannerPlugin('require("source-map-support").install();',
      {raw: true, entryOnly: false})
  ]
};

if (process.env.NODE_ENV == 'production') {
  webpackConfig.devtool = false;
  webpackConfig.plugins = [
    ...webpackConfig.plugins,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false
    })
  ]
}


export default webpackConfig;