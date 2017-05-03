import React from 'react'
import axios from 'axios'

import chartUtil from '../utils/chartData.jsx'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: 'San Francisco',
      chartDataF: chartUtil.initialize(),
      chartDataC: chartUtil.initialize(),
      cityCount: 0,
      units: 'C'
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.getWeatherData('San_Francisco')
  }

  getWeatherData(city) {

    var cityString
    var country
    var rangesF
    var rangesC
    var weather

    axios.get('/weather', {params: {city: city, units: 'imperial'}})
    .then(data => {
      cityString = data.data.city
      country = data.data.country
      rangesF = data.data.ranges
      weather = data.data.weather

      return axios.get('/weather', {params: {city: city, units: 'metric'}})
    })
    .then(data => {
      rangesC = data.data.ranges
      this.runCharts(cityString, rangesF, rangesC)
      this.setState({city: ''})
      
    })
    .catch(err => {
      console.log('err:', err)
    })
  }
  
  runCharts(city, rangesF, rangesC) {
    var chartDataF = this.state.chartDataF
    var chartDataC = this.state.chartDataC
    var [rangeF, averageF, rangeC, averageC] = chartUtil.createCityData(city, rangesF, rangesC, this.state.cityCount)
    chartDataF.series.push(rangeF)
    chartDataF.series.push(averageF)
    chartDataC.series.push(rangeC)
    chartDataC.series.push(averageC)

    this.setState({
      chartDataF: chartDataF,
      chartDataC: chartDataC,
      cityCount: this.state.cityCount + 1
    })

    const chartData = this.state.units === 'F' ? chartDataF : chartDataC
    Highcharts.chart('chart-data', chartData)
  }

  handleChange(e) {
    const value = e.target.value
    const name = e.target.name
    this.setState({
      [name] : value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    if(this.state.city !== '') {
      const city = this.state.city.split(' ').join('_')
      this.getWeatherData(city)
    }
  }
  
  render () {
    return (
      <div>
        <div id="chart-data"></div>
          city:
          <input type="text" list="cities" name="city" value={this.state.city} onChange={this.handleChange}></input>
          <datalist id="cities">
            <option value="San Francisco"></option>
            <option value="New York"></option>
            <option value="Berlin"></option>
            <option value="San Jose"></option>
            <option value="Paris"></option>
            <option value="Tokyo"></option>
          </datalist>
          <button onClick={this.handleSubmit}>Add to graph</button>
      </div>
    )
  }

}