import React, { Component } from 'react';
import WeatherService from '../../Services/OWMService';
import Header from '../Header';
import './CurrentWeather.scss';
import { Link } from 'react-router-dom';
import { WithData } from '../HOC';
import { store } from '../../redux';

class CurrentWeather extends Component {

    formatDate(date) {
        const d = new Date(date * 1000);
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return (weekday[d.getDay()] + ", " + ("0" + d.getDate()).slice(-2)
            + "." + ("0" + (d.getMonth() + 1)).slice(-2) + "." + d.getFullYear());
    }

    componentDidMount() {
        const { temp } = this.props.data;
        if (temp > 15) {
            store.dispatch({ type: 'SET_THEME', theme: 'hot' });
        } else if (temp > 5) {
            store.dispatch({ type: 'SET_THEME', theme: 'warm' });
        } else {
            store.dispatch({ type: 'SET_THEME', theme: 'cold' });
        }
    }

    render() {
        const {
            date, name, temp, desc, icon, high,
            low, wind, humidity
        } = this.props.data;

        return (
            <div className="current-weather__container">
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
            </div>
        );
    }
};

const { getCurrentWeather } = new WeatherService();

export default WithData(CurrentWeather, getCurrentWeather);