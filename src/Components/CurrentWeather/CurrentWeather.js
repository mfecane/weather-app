import React, { Component } from 'react';

import WeatherService from '../../Services/WeatherService';

export default class CurrentWeather extends Component {

    weatherService = new WeatherService();

    state = {
        weather: {},
        error: false,
        loading: true
    }

    onError = (err) => {
        console.log(err);
        this.setState({
            error: true,
            loading: false
        });
    }

    componentDidMount() {
        this.componentUpdate();
        //this.interval = setInterval(this.componentUpdate, 5000);
    }

    componentUpdate = () => {
        this.setState({
            loading: true,
            error: false
        });
        this.weatherService
            .getCurrentWeather("Moscow")
            .then(this.onWeatherLoaded)
            .catch(this.onError);
    }

    onWeatherLoaded = (weather) => {
        this.setState({
            weather,
            loading: false,
            error: false
        });
    }


    render() {

        const { weather: { date, name, temp, weatherTypeDesc, icon }, error, loading } = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <div>{'error'}</div> : null;
        const spinner = loading ? <div>{'loading'}</div> : null;
        const content = hasData ? <React.Fragment>
            <div>
                {date}
                {name}
                <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" /> 
                <ul>
                    <li>{temp}</li>
                    <li>{weatherTypeDesc}</li>
                </ul>
            </div>
        </React.Fragment> : null;

        return (
            <div>
                {content}
                {errorMessage}
                {spinner}
            </div>
        );
    }
};
