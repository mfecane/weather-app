import React, { Component } from 'react';
import Cities from '../Cities';
import CurrentWeather from '../CurrentWeather';
import Forecast from '../Forecast';
import Hourly from '../Hourly';
import Details from '../Details'
import { BrowserRouter, Route } from 'react-router-dom';
import './App.scss';
import {ErrorBoundary} from '../Error';

export default class App extends Component {

  state = {
    city: 'Moscow',
    theme: 'cold'
  }

  selectCity = (city) => {
    this.setState({
      city: city
    });
  }

  render() {
    const { theme } = this.state;
    return (
      <ErrorBoundary>
        <BrowserRouter>
          <Route path="/" exact render={(props) => (
            <WeaterPage {...props} theme={theme} />
          )} />
          <Route path="/city/:id" render={(props) => (
            <WeaterPage {...props} theme={theme} />
          )} />
          <Route path="/cities" render={(props) => (
            <CitiesPage {...props} theme={theme} />
          )} />
          <Route path="/details" render={(props) => (
            <DetailsPage {...props} theme={theme} />
          )} />
        </BrowserRouter>
      </ErrorBoundary>
    );
  }
}

const WeaterPage = ({ match: { params: { id } }, theme, selectTheme }) => {
  return (
    <div className="app">
      <div className={`app__top-container ${theme}`}>
        <CurrentWeather param={{city: 'Moscow'}} />
        <Hourly param={{city: 'Moscow'}} theme={theme}/>
      </div>
      <div className="app__bottom-container">
        <Forecast param={{city: 'Moscow'}} />
      </div>
    </div>
  );
};

const CitiesPage = ({ theme }) => (
  <div className="app">
    <div className={`app__full-container ${theme}`}>
      <Cities />
    </div>
  </div>
)

const DetailsPage = ({ theme }) => (
  <div className="app">
    <div className={`app__full-container--grad ${theme}`}>
      <Details param={{city: 'Moscow'}} />
    </div>
  </div>
)