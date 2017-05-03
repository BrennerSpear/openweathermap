var webpack = require('webpack')
var path = require('path')

var APP_DIR = path.resolve(__dirname, 'client/src')
var BUILD_DIR = path.resolve(__dirname, 'client/build')

console.log(APP_DIR)
console.log(BUILD_DIR)

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },

  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  },

  // resolve: {
  //   alias: {
  //        "jquery": path.join(__dirname, "./jquery-stub.js")
  //   }
  // },

  devtool: 'source-map'
}

module.exports = config