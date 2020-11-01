import React, { Component } from 'react';

import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import { ErrorBoundary } from '../Error';

import { WeatherPage, CitiesPage, DetailsPage } from '../Pages';

import './App.scss';

export default class App extends Component {

  componentDidUpdate = () => {
    const { theme } = this.props.store.getState();
    switch (theme) {
      case 'hot':
        document.documentElement.className = 'hotTheme';
        break;
      case 'warm':
        document.documentElement.className = 'warmTheme';
        break;
      case 'cold':
        document.documentElement.className = 'coldTheme';
        break;
      default:
        document.documentElement.className = 'warmTheme';
        break;
    }
    console.log(document.documentElement.className);
  }


  render() {
    return (
      <ErrorBoundary>
        <BrowserRouter basename="/weather-app">
          <Route path="/" exact component={WeatherPage} />
          <Route path="/city/:id" component={WeatherPage} />
          <Route path="/cities" component={CitiesPage} />
          <Route path="/details" exact component={DetailsPage} />
          <Route path="/details/:id" component={DetailsPage} />
        </BrowserRouter>
      </ErrorBoundary>
    );
  }
}