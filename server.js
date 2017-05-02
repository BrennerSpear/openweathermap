var express = require('express')

var app = express()

app.use(express.static(__dirname + '/client'))

app.listen(8080, () => {
  console.log('listening on 8080')
})