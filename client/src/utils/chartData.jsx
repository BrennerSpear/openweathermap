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

exports.createCityData = function(name, ranges, colorInteger) {
  const averages = getAverages(ranges)

  return [{
          name: name,
          data: averages,
          zIndex: 1,
          marker: {
              fillColor: 'white',
              lineWidth: 2,
              lineColor: Highcharts.getOptions().colors[colorInteger]
          }
      }, {
          name: 'Range',
          data: ranges,
          type: 'arearange',
          lineWidth: 0,
          linkedTo: ':previous',
          color: Highcharts.getOptions().colors[colorInteger],
          fillOpacity: 0.3,
          zIndex: 0
      }]

}