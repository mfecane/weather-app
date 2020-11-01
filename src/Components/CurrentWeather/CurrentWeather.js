import React, { Component } from 'react';
import WeatherService from '../../Services/OWMService';
import './CurrentWeather.scss';
import { Link } from 'react-router-dom';
import { WithData } from '../HOC';
import { connect } from 'react-redux';
import * as actions from '../Actions'
import Animated from '../HOC/Animated';


class CurrentWeather extends Component {

    formatDate(date) {
        const d = new Date(date * 1000);
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return (weekday[d.getDay()] + ", " + ("0" + d.getDate()).slice(-2)
            + "." + ("0" + (d.getMonth() + 1)).slice(-2) + "." + d.getFullYear());
    }

    componentDidMount() {
        const { data: { temp }, setTheme } = this.props;
        if (temp > 15) {
            setTheme('hot');
        } else if (temp > 5) {
            setTheme('warm');
        } else {
            setTheme('cold');
        }
    }

    render() {

        const {
            date, name, temp, desc, icon, high,
            low, wind, humidity
        } = this.props.data;

        const { city } = this.props.param;

        let url = '/details';
        if (city) {
            url = '/details/' + city
        }

        return (
            <div className="current-weather__container">
                <h2 className="current-weather-header__date fade-in">{this.formatDate(date)}</h2>
                <h2 className="current-weather-header__city fade-in">
                    <Link to='/cities'><i className="fa fa-map-marker" />{city}</Link>
                </h2>
                <div className="current-weather__type-container slide-left">
                    <img
                        className="current-weather__type-img"
                        src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
                    <h3 className="current-weather__type-desc">{desc}</h3>
                </div>
                <div className="current-weather__temp current-weather-temp__container">
                    <h1 className="current-weather-temp__temp-value rotate-in">
                        {temp}
                    </h1>
                    <div className="current-weather__hilo-container rotate-in">
                        <div className="current-weather__hilo-element">
                            <i className="current-weather__hilo-icon fa fa-chevron-up" />
                            <span className="current-weather__hilo-temp">{high}</span>
                        </div>
                        <div className="current-weather__hilo-element">
                            <i className="current-weather__hilo-icon fa fa-chevron-down" />
                            <span className="current-weather__hilo-temp">{low}</span>
                        </div>
                    </div>
                    <div className="current-weather__info current-weather-info__container slide-right">
                        <div className="current-weather-info__label">
                            HUMIDITY
                                </div>
                        <div className="current-weather-info__value">
                            {`${humidity}%`}
                        </div>
                        <div className="current-weather-info__label">
                            WIND
                                </div>
                        <div className="current-weather-info__value">
                            {`${wind}`}m/s
                                </div>
                    </div>
                </div>
                <Link to={url} className="btn current-weather__more-button slide-bottom">More details</Link>
            </div>
        );
    }
};

const { getCurrentWeather } = new WeatherService();

export default connect(null, actions)(WithData(Animated(CurrentWeather), getCurrentWeather));