import React, { Component } from 'react';
import CurrentWeather from '../CurrentWeather';
import Forecast from '../Forecast';
import './App.css';

export default class App extends Component {

  render() {

    return (
      <div className="app">
        <CurrentWeather />
        <Forecast />
      </div>
    );
  }
}
