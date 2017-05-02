var router = require('express').Router()
var weather = require('./weather')


router.get('/weather', weather.forecast);


module.exports = router