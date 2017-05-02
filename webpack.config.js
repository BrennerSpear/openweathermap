var webpack = require('webpack')
var path = require('path')

var APP_DIR = path.resolve(__dirname, 'client/src', 'index.jsx')
var BUILD_DIR = path.resolve(__dirname, 'client/build')

console.log(APP_DIR)
console.log(BUILD_DIR)

var config = {
  entry: APP_DIR,
  output: {
    path: path.resolve(__dirname, 'client/build'),
    filename: 'bundle.js'
  }
}

module.exports = config