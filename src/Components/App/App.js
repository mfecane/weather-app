import React, { Component } from 'react';
import CurrentWeather from '../CurrentWeather';
import Forecast from '../Forecast';
import Hourly from '../Hourly';
import './App.scss';

export default class App extends Component {

  render() {

    return (
      <div className="app">
        <CurrentWeather />
        <Hourly />
        <Forecast />
      </div>
    );
  }
}
