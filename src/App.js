import React, { Component } from 'react';
import CurrentWeather from './Components/CurrentWeather';


export default class App extends Component {

  render() {

    return (
      <div className="App">
        <CurrentWeather />
      </div>
    );
  }
}
