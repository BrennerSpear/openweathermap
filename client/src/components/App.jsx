import React from 'react'
import axios from 'axios'

import chartUtil from '../utils/chartData.jsx'

var ranges = [
        [1246406400000, 14.3, 27.7],
        [1246492800000, 14.5, 27.8],
        [1246579200000, 15.5, 29.6],
        [1246665600000, 16.7, 30.7],
        [1246752000000, 16.5, 25.0],
        [1246838400000, 17.8, 25.7],
        [1246924800000, 13.5, 24.8],
        [1247011200000, 10.5, 21.4],
        [1247097600000, 9.2, 23.8],
        [1247184000000, 11.6, 21.8],
        [1247270400000, 10.7, 23.7],
        [1247356800000, 11.0, 23.3],
        [1247443200000, 11.6, 23.7],
        [1247529600000, 11.8, 20.7],
        [1247616000000, 12.6, 22.4],
        [1247702400000, 13.6, 19.6],
        [1247788800000, 11.4, 22.6],
        [1247875200000, 13.2, 25.0],
        [1247961600000, 14.2, 21.6],
        [1248048000000, 13.1, 17.1],
        [1248134400000, 12.2, 15.5],
        [1248220800000, 12.0, 20.8],
        [1248307200000, 12.0, 17.1],
        [1248393600000, 12.7, 18.3],
        [1248480000000, 12.4, 19.4],
        [1248566400000, 12.6, 19.9],
        [1248652800000, 11.9, 20.2],
        [1248739200000, 11.0, 19.3],
        [1248825600000, 10.8, 17.8],
        [1248912000000, 11.8, 18.5],
        [1248998400000, 10.8, 16.1]
    ]


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: 'hello world'
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.getWeatherData()
  }

  getWeatherData() {
    axios.get('/weather/')
    .then(data => {
      const city = data.data.city
      const country = data.data.country
      const ranges = data.data.ranges
      const weather = data.data.weather
      this.runCharts(city, ranges)
    })
    .catch(err => {
      console.log('err:', err)
    })
  }
  
  runCharts(city, ranges) {
    var chartData = chartUtil.initialize()
    var [ny1, ny2] = chartUtil.createCityData(city, ranges, 0)
    chartData.series.push(ny1)
    chartData.series.push(ny2)

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
      console.log('city:',this.state.city)
    }
  }
  
  render () {
    return (
      <div>
        <div id="chart-data"></div>
          city:
          <input type="text" list="cities" name="city" onChange={this.handleChange}></input>
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