import React, { Component } from 'react';
import WeatherService from '../../Services/WeatherService';
import Spinner from '../Spinner';
import './CurrentWeather.css';

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

    formatDate(date) {
        const d = new Date(date * 1000);
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        return weekday[d.getDay()] + ", " + ("0" + d.getDate()).slice(-2) + "." + ("0" + (d.getMonth() + 1)).slice(-2) + "." + d.getFullYear();
    }

    formatTemp(temp) {
        if (temp > 0) {
            return `+${temp}`;
        } else {
            return `${temp}`;
        }
    }

    render() {
        const { weather: { date, name, temp, weatherTypeDesc, icon, high, low }, error, loading } = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <div>{'error'}</div> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? <React.Fragment>
            <h2 className="current-weather__date">{this.formatDate(date)}</h2>
            <h2 className="current-weather__city">
                <i className="fa fa-map-marker" />{name}
            </h2>
            <h3 className="current-weather__desc">{weatherTypeDesc}</h3>
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
            <div className="current-weather__tempgroup">
                <h1 className="current-weather__temp">
                    {temp}
                </h1>
                <div className="current-weather-hilo">
                    <div className="current-weather-hilo__container">
                        <i className="fa fa-chevron-up" />
                        <span>{high}</span>
                    </div>
                    <div className="current-weather-hilo__container">
                        <i className="fa fa-chevron-down" />
                        <span>{low}</span>
                    </div>
                </div>
            </div>
        </React.Fragment> : null;

        return (
            <div className="current-weather__container">
                {content}
                {errorMessage}
                {spinner}
            </div>
        );
    }
};
