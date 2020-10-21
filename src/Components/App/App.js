import React, { Component } from 'react';
import Cities from '../Cities';
import CurrentWeather from '../CurrentWeather';
import Forecast from '../Forecast';
import Hourly from '../Hourly';
import Details from '../Details'
import { BrowserRouter, Route } from 'react-router-dom';
import './App.scss';

export default class App extends Component {

  state = {
    city: 'Moscow',
    theme: 'hot'
  }

  selectCity = (city) => {
    this.setState({
      city: city
    });
  }

  // selectTheme = (temp) => {
  //   const newTheme = 'hot';
  //   if (temp < 20) {
  //     newTheme = 'warm';
  //   }
  //   if (temp < 5) {
  //     newTheme = 'cold';
  //   }
  //   console.log(newTheme);
  //   this.setState({
  //     theme: newTheme
  //   });
  // }

  render() {
    const { theme } = this.state;
    return (
      <BrowserRouter>
        <Route path="/" exact render={(props) => (
          <WeaterPage {...props} theme={theme}/>
        )}/>
        <Route path="/city/:id" render={(props) => (
          <WeaterPage {...props} theme={theme}/>
        )}/>
        <Route path="/cities" render={(props) => (
          <CitiesPage {...props} theme={theme}/>
        )}/>
        <Route path="/details" render={(props) => (
          <DetailsPage {...props} theme={theme}/>
        )}/>
      </BrowserRouter>
    );
  }
}

const WeaterPage = ({ match: { params: { id } }, theme, selectTheme }) => {
  return (
    <div className="app">
      <div className={`app__top-container ${theme}`}>
        <CurrentWeather city={id} theme={theme} selectTheme={selectTheme}/>
        <Hourly city={id} theme={theme} />
      </div>
      <div className="app__bottom-container">
        <Forecast city={id} />
      </div>
    </div>
  );
};

const CitiesPage = ({theme}) => (
  <div className="app">
    <div className={`app__full-container ${theme}`}>
      <Cities />
    </div>
  </div>
)

const DetailsPage = ({theme}) => (
  <div className="app">
    <div className={`app__full-container--grad ${theme}`}>
      <Details />
    </div>
  </div>
)