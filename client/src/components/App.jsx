import React from 'react'
import axios from 'axios'

import { Button, Grid, Row, Col, Jumbotron, FormControl } from 'react-bootstrap'


import chartUtil from '../utils/chartData.jsx'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: 'San Francisco',
      forecastLength: 15,
      chartDataF: chartUtil.initialize(),
      chartDataC: chartUtil.initialize(),
      currentChartDataF: null,
      currentChartDataC: null,
      cities: [],
      cityCount: 0,
      units: 'C'
    }

    this.center = {
      textAlign: 'center'
      // float: 'none',
      // marginLeft: 'auto',
      // marginRight: 'auto'
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.switchUnits = this.switchUnits.bind(this)
    this.switchForecastLength = this.switchForecastLength.bind(this)
  }

  componentDidMount() {
    this.getWeatherData('San_Francisco')
  }

  getWeatherData(city) {

    var cityString
    var country
    var rangesF
    var rangesC

    axios.get('/weather', {params: {city: city, units: 'imperial'}})
    .then(data => {
      cityString = data.data.city
      country = data.data.country
      rangesF = data.data.ranges

      return axios.get('/weather', {params: {city: city, units: 'metric'}})
    })
    .then(data => {
      rangesC = data.data.ranges

      if(!this.state.cities.includes(cityString)) {
        this.runCharts(cityString, rangesF, rangesC)
        var cities = this.state.cities
        cities.push(cityString)
        this.setState({city: '', cities: cities})
      }
      
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
    // var [currentChartDataF, currentChartDataC] = chartUtil.trimData(chartDataF, chartDataC, this.forecastLength)

    this.setState({
      chartDataF: chartDataF,
      chartDataC: chartDataC,
      // currentChartDataF: currentChartDataF,
      // currentChartDataC: currentChartDataC,
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

  switchUnits() {
    var chartData

    if(!this.state.currentChartDataF) {
      chartData = this.state.units === 'F' ? this.state.chartDataC : this.state.chartDataF
    }
    else {
      chartData = this.state.units === 'F' ? this.state.currentChartDataC : this.state.currentChartDataF
    }

    Highcharts.chart('chart-data', chartData)
    this.setState({
      units: (this.state.units === 'F' ? 'C' : 'F')
    })
  }

  switchForecastLength(days) {
    const [currentChartDataF, currentChartDataC] = chartUtil.trimData(this.state.chartDataF, this.state.chartDataC, days)
    console.log(currentChartDataF)
    const chartData = this.state.units === 'F' ? currentChartDataF : currentChartDataC
    console.log('lets go')
    Highcharts.chart('chart-data', chartData)

    this.setState({
      currentChartDataF: currentChartDataF,
      currentChartDataC: currentChartDataC,
      forecastLength: days
    })

  }

  
  render () {
    return (
      <div>
        <Grid>
          <Row>
            <Jumbotron>
              <h1 className="text-center">Open Weather Forecasts</h1>
            </Jumbotron>
          </Row>
          <Row>
            <Col lg={2}>
            <div>
              <h3>city:</h3>
              <FormControl type="text" list="cities" name="city" value={this.state.city} onChange={this.handleChange}></FormControl>
              <datalist id="cities">
                <option value="San Francisco"></option>
                <option value="New York"></option>
                <option value="Berlin"></option>
                <option value="San Jose"></option>
                <option value="Paris"></option>
                <option value="Tokyo"></option>
              </datalist>
              <Button bsStyle="primary" onClick={this.handleSubmit}>Add to graph</Button>
            </div>
            <br/>
            <div className="text-center">
              {/*<input type="button" onClick={this.switchUnits} value={"Switch to " + (this.state.units ==='F' ? 'Celcius' : 'Fahrenheit')}></input>*/}
              <Button bsStyle="primary" onClick={this.switchUnits}>{"Switch to " + (this.state.units ==='F' ? 'Celcius' : 'Fahrenheit')}</Button>
            </div>

            </Col>
            <Col lg={10}>
              <Row><div id="chart-data"></div></Row>
              <Row className="text-center">
                <h3 className="text-center">Forecast Length (days)</h3>
                <Button bsStyle="primary" onClick={() => this.switchForecastLength(6)}>6</Button>
                <Button bsStyle="primary" onClick={() => this.switchForecastLength(7)}>7</Button>
                <Button bsStyle="primary" onClick={() => this.switchForecastLength(8)}>8</Button>
                <Button bsStyle="primary" onClick={() => this.switchForecastLength(9)}>9</Button>
                <Button bsStyle="primary" onClick={() => this.switchForecastLength(10)}>10</Button>
                <Button bsStyle="primary" onClick={() => this.switchForecastLength(11)}>11</Button>
                <Button bsStyle="primary" onClick={() => this.switchForecastLength(12)}>12</Button>
                <Button bsStyle="primary" onClick={() => this.switchForecastLength(13)}>13</Button>
                <Button bsStyle="primary" onClick={() => this.switchForecastLength(14)}>14</Button>
                <Button bsStyle="primary" onClick={() => this.switchForecastLength(15)}>15</Button>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }

}