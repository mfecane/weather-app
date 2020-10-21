import React, { Component } from 'react';
import WeatherService from '../../Services/OWMService';
import Header from '../Header';
import Spinner from '../Spinner';
import './CurrentWeather.scss';
import { Link } from 'react-router-dom';

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
        return (weekday[d.getDay()] + ", " + ("0" + d.getDate()).slice(-2)
            + "." + ("0" + (d.getMonth() + 1)).slice(-2) + "." + d.getFullYear());
    }

    render() {
        const { city, selectTheme } = this.props;

        const {
            weather:
            {
                date, name, temp, desc, icon, high,
                low, wind, humidity
            },
            error,
            loading
        } = this.state;


        const hasData = !(loading || error);

        const errorMessage = error ? <div>{'error'}</div> : null;
        const spinner = loading ? (
            <div className="current-weather__spinner-container">
                <Spinner />
            </div>
        ) : null;
        const content = hasData ? (
            <>
                <Header city={name} date={this.formatDate(date)} />
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
                        <div className="current-weather__info-container">
                            <div className="current-weather__info">
                                <div className="current-weather__info-label">
                                    HUMIDITY
                                </div>
                                <div className="current-weather__info-value">
                                    {`${humidity}%`}
                                </div>
                                <div className="current-weather__info-label">
                                    WIND
                                </div>
                                <div className="current-weather__info-value">
                                    {`${wind}`}m/s
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to="/details" className="khbtn current-weather__more-button">More details</Link>
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
