import React, { Component } from 'react';
import Cities from '../Cities';
import Details from '../Details'
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import { ErrorBoundary } from '../Error';
import { store } from '../Redux';
import * as actions from '../Actions';
import { bindActionCreators } from 'redux';

import WeatherPage from '../Pages/WeatherPage';

import './App.scss';

const { dispatch } = store;

const { setTheme } = bindActionCreators(actions, dispatch);

export default class App extends Component {

  render() {
    return (
      <ErrorBoundary>
        <BrowserRouter basename="/weather-app">
          <Route path="/" exact render={() => (
            <WeatherPage />
          )} />
          <Route path="/city/:id" component={WeatherPage} />
          <Route path="/cities" render={() => (
            <CitiesPage />
          )} />
          <Route path="/details" exact render={() => {
            return (
              <DetailsPage />
            );
          }} />
          <Route path="/details/:id" exact render={() => {
            return (
              <DetailsPage />
            );
          }} />
        </BrowserRouter>
      </ErrorBoundary>
    );
  }
}

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

const DetailsPage = withRouter(({ match }) => {
  let { id } = match.params;
  if (!id) {
    id = 'Moscow';
  }
  const { theme } = store.getState();
  return (<div className="app">
    <div className={`app__full-container--grad ${theme}`}>
      <Details param={{ city: id }} />
    </div>
  </div>);
});