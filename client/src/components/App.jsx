import React from 'react'
import axios from 'axios'

import chartUtil from '../utils/chartData.jsx'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: 'San Francisco',
      chartData: chartUtil.initialize(),
      cityCount: 0
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.getWeatherData('San_Francisco')
  }

  getWeatherData(city) {
    axios.get('/weather/', {
      params: {
        city: city
      }
    })
    .then(data => {
      const city = data.data.city
      const country = data.data.country
      const ranges = data.data.ranges
      const weather = data.data.weather
      this.runCharts(city, ranges)
      this.setState({city: ''})
    })
    .catch(err => {
      console.log('err:', err)
    })
  }
  
  runCharts(city, ranges) {
    var chartData = this.state.chartData
    var [range, average] = chartUtil.createCityData(city, ranges, this.state.cityCount)
    chartData.series.push(range)
    chartData.series.push(average)

    this.setState({
      chartData: chartData,
      cityCount: this.state.cityCount + 1
    })

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