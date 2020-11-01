import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { Provider } from 'react-redux';
import { store } from './Components/Redux'
import WeatherApiService from './Services/WeatherApiService';
import OWMService from './Services/OWMService';

import {
    OWMProvider,
    WeatherAPIProvider,
} from './Components/Context';

import './index.scss';

const weatherApiService = new WeatherApiService();
const openWeatherMapService = new OWMService();

const update = () => {
    ReactDOM.render(
        <OWMProvider value={openWeatherMapService}>
            <WeatherAPIProvider value={weatherApiService}>
                <Provider store={store}>
                    <App store={store} />
                </Provider>
            </WeatherAPIProvider>
        </OWMProvider>
        , document.getElementById('root'));
}

update();
store.subscribe(update);