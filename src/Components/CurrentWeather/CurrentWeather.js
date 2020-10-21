import React, { Component } from 'react';
import WeatherService from '../../Services/OWMService';
import Spinner from '../Spinner';
import './CurrentWeather.scss';

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
        this.interval = setInterval(this.componentUpdate, 10 * 60 * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentUpdate = () => {
        this.setState({
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
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return weekday[d.getDay()] + ", " + ("0" + d.getDate()).slice(-2) + "." + ("0" + (d.getMonth() + 1)).slice(-2) + "." + d.getFullYear();
    }

    render() {
        const { weather: { date, name, temp, desc, icon, high, low }, error, loading } = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <div>{'error'}</div> : null;
        const spinner = loading ? (
            <div className="current-weather__spinner-container">
                <Spinner />
            </div>
        ) : null;
        const content = hasData ? (
            <>
            <div className="current-weather__header-container">
                <h2 className="current-weather__date">{this.formatDate(date)}</h2>
                <h2 className="current-weather__city">
                    <i className="fa fa-map-marker" />{name}
                </h2>
            </div>
            <div className="current-weather__container-inner">
                <div className="current-weather__type-container">
                    <img 
                    className="current-weather__type-img"
                    src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
                    <h3 className="current-weather__type-desc">{desc}</h3>
                </div>
                <div className="current-weather__temp-container">
                    <h1 className="current-weather__temp">
                        {temp}
                    </h1>
                    <div className="current-weather__hilo-container">
                        <div className="current-weather__hilo-element">
                            <i className="current-weather__hilo-icon fa fa-chevron-up" />
                            <span className="current-weather__hilo-temp">{high}</span>
                        </div>
                        <div className="current-weather__hilo-element">
                            <i className="current-weather__hilo-icon fa fa-chevron-down" />
                            <span className="current-weather__hilo-temp">{low}</span>
                        </div>
                    </div>
                </div>
            </div>
            </>
        ) : null;

        return (
            <div className="current-weather__container">
                {content}
                {errorMessage}
                {spinner}
            </div>
        );
    }
};
