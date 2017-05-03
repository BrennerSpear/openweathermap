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
          crosshairs: true,
          shared: true,
          valueSuffix: '°C'
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
    average = ((ranges[i][1] + ranges[i][2]) / 2)
    averages.push([ranges[i][0], average])
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