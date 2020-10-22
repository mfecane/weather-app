import React, { Component } from 'react';
import Cities from '../Cities';
import CurrentWeather from '../CurrentWeather';
import Forecast from '../Forecast';
import Hourly from '../Hourly';
import Details from '../Details'
import { BrowserRouter, Route } from 'react-router-dom';
import { ErrorBoundary } from '../Error';
import { store } from '../../redux';

import './App.scss';

export default class App extends Component {

  update = () => {
    this.render();
  }

  shouldComponentUpdate = () => {
    console.log('or wont');
  }

  componentDidMount = () => {
    store.subscribe(this.update);
  }

  render() {
    return (
      <ErrorBoundary>
        <BrowserRouter>
          <Route path="/" exact render={() => (
            <WeaterPage />
          )} />
          <Route path="/city/:id" render={(props) => {
            const { match: { params: { id } } } = props;
            store.dispatch({ type: 'SELECT_CITY', city: id });
            return <WeaterPage />;
          }} />
          <Route path="/cities" render={() => (
            <CitiesPage />
          )} />
          <Route path="/details" render={() => {
            return (
              <DetailsPage />
            );
          }} />
        </BrowserRouter>
      </ErrorBoundary>
    );
  }
}

const WeaterPage = () => {
  const { city, theme } = store.getState();
  return (
    <div className="app">
      <div className={`app__top-container ${theme}`}>
        <CurrentWeather param={{ city: city }} />
        <Hourly param={{ city: city }} theme={theme} />
      </div>
      <div className="app__bottom-container">
        <Forecast param={{ city: city }} />
      </div>
    </div>
  );
};

const CitiesPage = () => {
  const { city, theme } = store.getState();
  return (
    <div className="app">
      <div className={`app__full-container ${theme}`}>
        <Cities />
      </div>
    </div>
  );
}

const DetailsPage = () => {
  const { city, theme } = store.getState();
  return (<div className="app">
    <div className={`app__full-container--grad ${theme}`}>
      <Details param={{ city: city }} />
    </div>
  </div>);
};