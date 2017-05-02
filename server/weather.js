var weather = require('openweathermap')

weather.defaults({
  APPID: process.env.OPENWEATHERKEY,
  cnt: 15,
  units: 'imperial'
})


const getForcaseAysnc = function(config) {
  return new Promise(function(resolve,reject) {
    weather.forecast(config, function(err, config) {
      if(err !== null) return reject(err)
      resolve(config)
    })
  })
}

var queryParams = {
  q: 'san_francisco'
}

exports.forecast = function(req, res) {
  // console.log(req.query)
  getForcaseAysnc(queryParams)
  .then(data => {
    res.send(data)
    console.log('data sent')
  })

}