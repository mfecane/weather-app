import React from 'react'
import { withRouter } from "react-router-dom";

import { store } from '../Redux';
import CurrentWeather from "../CurrentWeather";
import Forecast from "../Forecast";
import Hourly from "../Hourly";
import { bindActionCreators } from 'redux';
import * as actions from '../Actions';

const { dispatch } = store;

const { setTheme } = bindActionCreators(actions, dispatch);


const WeatherPage = withRouter(({ match }) => {
    let { id } = match.params;
    if (!id) {
        id = 'Moscow';
    }
    const { theme } = store.getState();
    return (
        <div className="app">
            <div className={`app__top-container ${theme}`}>
                <CurrentWeather param={{ city: id }} setTheme={setTheme} />
                <Hourly param={{ city: id }} theme={theme} />
            </div>
            <div className="app__bottom-container">
                <Forecast param={{ city: id }} />
            </div>
        </div>
    );
});

export default WeatherPage;