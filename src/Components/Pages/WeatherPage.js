import React from 'react'
import { withRouter } from "react-router-dom";

import CurrentWeather from "../CurrentWeather";
import Forecast from "../Forecast";
import Hourly from "../Hourly";

import './Pages.scss';

const WeatherPage = withRouter(({ match }) => {
    let { id } = match.params;
    if (!id) {
        id = 'Moscow';
    }
    return (
        <div className="app">
            <div className='app__top-container'>
                <div className="app-top__current-wrapper">
                    <CurrentWeather param={{ city: id }} />
                </div>
                <div className="app-top__hourly-wrapper">
                    <Hourly param={{ city: id }} />
                </div>
            </div>
            <div className="app__bottom-container">
                <Forecast param={{ city: id }} />
            </div>
        </div>
    );
});

export default WeatherPage;