import React, { Component } from 'react';
import WithData from '../HOC/WithData';
import WeatherService from '../../Services/OWMService';
import { Link } from 'react-router-dom';

import './Details.scss';

class Details extends Component {

    degreesToDirection(deg) {
        const dirArr = ['NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];
        let out = 'N';
        dirArr.forEach((el, index) => {
            if (deg >= (360 / 32 + 360 / 16 * index)) {
                out = el;
            }
        });
        return out;
    }

    formatDate(date) {
        const d = new Date(date * 1000);
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return (weekday[d.getDay()] + ", " + ("0" + d.getDate()).slice(-2)
            + "." + ("0" + (d.getMonth() + 1)).slice(-2) + "." + d.getFullYear());
    }

    formatTime(date) {
        const d = new Date(date * 1000);
        return (d.getHours() + ':' + ("0" + d.getMinutes()).slice(-2));
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        const { date, city, clouds, humidity, pressure, rain1h, sunrise, sunset, temp, feels_like,
            temp_max, temp_min, weatherDesc, weatherIcon, windDeg, windSpeed } = this.props.data;

        return (
            <div className="details__container">
                <Link className="details__button-back" to="/"><i className="fa fa-arrow-left" /></Link>
                <div className="details__column">
                    <div className="details__city">
                        <div className="details__city-label">Last updated</div>
                        <div className="details__city-value">{`${this.formatTime(date)} ${this.formatDate(date)}`}</div>
                        <div className="details__city-label">Location</div>
                        <div className="details__city-value">
                            <Link to="/cities" className="details__city-link">
                                <i className="fa fa-map-marker" />{city}
                            </Link>
                        </div>
                    </div>
                    <div className="details__main-container">
                        <div className="details__temp-group">
                            <div className="details__temp">{temp}</div>
                            <div className="details__temp-details">
                                <div className="details__label-temp ">Feels like</div>
                                <div className="details__value temp">{feels_like}</div>
                                <div className="details__label-temp">Min</div>
                                <div className="details__value temp">{temp_min}</div>
                                <div className="details__label-temp">Max</div>
                                <div className="details__value temp">{temp_max}</div>
                            </div>
                        </div>
                        <div className="details__weather-group">
                            <img
                                className="details__weather-img"
                                src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="" />
                            <div className="details__weather-label">{`${this.capitalizeFirstLetter(weatherDesc)}`}</div>
                        </div>
                    </div>
                    <div className="bottom__columns">
                        <div className="bottom__left">
                            <div className="bottom__col">
                                <div className="details__label">Cloudness</div>
                                <div className="details__value">{`${clouds} %`}</div>
                                <div className="details__label">Humidity</div>
                                <div className="details__value">{`${humidity} %`}</div>
                                <div className="details__label">Pressure</div>
                                <div className="details__value">{`${pressure} hPa`}</div>
                                {rain1h !== null ? <>
                                    <div className="details__label">Amount of rain for the last hour</div>
                                    <div className="details__value">{`${rain1h} mm`}</div>
                                </> : null
                                }
                                <div className="details__label">Wind Direction</div>
                                <div className="details__value">{`${this.degreesToDirection(windDeg)}`}</div>
                                <div className="details__label">Wind speed</div>
                                <div className="details__value">{`${windSpeed} m/s`}</div>
                            </div>
                        </div>
                        <div className="bottom__right">
                            <div className="bottom__col">
                                <div className="details__label">Sunrise time</div>
                                <div className="details__value">{this.formatTime(sunrise)}</div>
                                <div className="details__label">Sunset time</div>
                                <div className="details__value">{this.formatTime(sunset)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const { getDetailWeather } = new WeatherService();

export default WithData(Details, getDetailWeather);