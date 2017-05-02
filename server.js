const express = require('express')
const router = require('./server/routes')

var app = express()

app.use(require('morgan')('combined'))
app.use(require('body-parser').urlencoded({ extended: true }))


app.use('', router)
app.use(express.static(__dirname + '/client'))

app.listen(8080, () => {
  console.log('listening on 8080')
})