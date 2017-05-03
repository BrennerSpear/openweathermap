var cloneDeep = require('lodash.clonedeep')

exports.initialize = function() {
  return {
    title: {
          text: 'Forecast'
      },

      xAxis: {
          type: 'datetime'
      },

      yAxis: {
          title: {
              text: null
          }
      },

      tooltip: {
          formatter: function () {
            return 'Weather: <b>' + this.point.weather + '</b>';
        }
      },

      legend: {
      },

      series: []
  }
}

const getAverages = function(ranges) {
  var averages = []
  var average
  for(var i=0; i<ranges.length; i++) {
    average = ((ranges[i].high + ranges[i].low) / 2)
    averages.push({x: ranges[i].x, y: average, weather: ranges[i].weather})
  }
  return averages
}

exports.createCityData = function(name, rangesF, rangesC, colorInteger) {
  const averagesF = getAverages(rangesF)
  const averagesC = getAverages(rangesC)

  return [{
          name: name,
          data: averagesF,
          zIndex: 1,
          marker: {
              fillColor: 'white',
              lineWidth: 2,
              lineColor: Highcharts.getOptions().colors[colorInteger]
          }
      }, {
          name: 'Range',
          data: rangesF,
          type: 'arearange',
          lineWidth: 0,
          linkedTo: ':previous',
          color: Highcharts.getOptions().colors[colorInteger],
          fillOpacity: 0.3,
          zIndex: 0
      }, {
          name: name,
          data: averagesC,
          zIndex: 1,
          marker: {
              fillColor: 'white',
              lineWidth: 2,
              lineColor: Highcharts.getOptions().colors[colorInteger]
          }
      }, {
          name: 'Range',
          data: rangesC,
          type: 'arearange',
          lineWidth: 0,
          linkedTo: ':previous',
          color: Highcharts.getOptions().colors[colorInteger],
          fillOpacity: 0.3,
          zIndex: 0
      }]

}

var trimSingleSet = function(data, days) {
  var current = JSON.parse(JSON.stringify(data))
  for(var i=0; i<current.series.length; i++) {
    current.series[i].data.splice(days)
    current.tooltip.formatter = function () {return 'Weather: <b>' + this.point.weather + '</b>'}
  }
  return current
}

exports.trimData = function(dataF, dataC, days) {
  var currentF = trimSingleSet(dataF, days)
  var currentC = trimSingleSet(dataC, days)
  return [currentF, currentC]
}












