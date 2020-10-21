import React, { Component } from 'react';
import WeatherService from '../../Services/OWMService';
import Spinner from '../Spinner';
import './Forecast.scss'

export default class Forecast extends Component {

    weatherService = new WeatherService();

    state = {
        forecast: [],
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
            .getForecastWeather("Moscow")
            .then(this.onWeatherLoaded)
            .catch(this.onError);
    }

    onWeatherLoaded = (forecast) => {
        this.setState({
            forecast,
            loading: false,
            error: false
        });
    }

    formatDate(date) {
        const d = new Date(date * 1000);
        const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return {
            weekday: weekday[d.getDay()],
            day: ("0" + d.getDate()).slice(-2) + "." + ("0" + (d.getMonth() + 1)).slice(-2)
        };
    }
    
    formatTemp(temp) {
        if (temp > 0) {
            return `+${temp}`;
        } else {
            return `${temp}`;
        }
    }

    render() {

        const { forecast, error, loading } = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <div>{'error'}</div> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? <React.Fragment>
            {forecast.map(({ date, temp, icon }) => {
                const { weekday, day } = this.formatDate(date);
                return <Element key={date} weekday={weekday} day={day} temp={temp} icon={icon} />;
            })}
        </React.Fragment> : null;

        return (
            <div className="forecast__container">
                {content}
                {errorMessage}
                {spinner}
            </div>
        );
    }
};

const Element = ({ day, weekday, temp, icon }) => {



    return <div className="forecast-item__container">
        <div className="forecast-item__date">
            {weekday}
        </div>
        <div className="forecast-item__date">
            {day}
        </div>
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
        <div className="forecast-item__temp">
            {temp}
        </div>
    </div>;
}