import React, { Component } from 'react';
import './Forecast.scss'
import { WithData, WithOWMService } from '../HOC'
import Animated from '../HOC/Animated';
import { forecastRequest, forecastLoaded, forecastError } from '../Actions'
import { compose } from 'redux';
import { connect } from 'react-redux';

class Forecast extends Component {

    componentUpdate = () => {
        this.weatherService
            .getForecastWeather("Moscow")
            .then(this.onWeatherLoaded)
            .catch(this.onError);
    }

    onWeatherLoaded = (forecast) => {
        this.setState({
            forecast,
            loading: false
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
        const data = this.props.data;

        return (
            <div className="forecast__container">
                <React.Fragment>
                    {data.map(({ date, temp, icon }, index) => {
                        let { weekday, day } = this.formatDate(date);
                        weekday = (index === 0) ? 'Today' : weekday;
                        return <Element key={date} weekday={weekday} day={day} temp={temp} icon={icon} index={index} />;
                    })}
                </React.Fragment>
            </div>
        );
    }
};

const Element = ({ day, weekday, temp, icon, index }) => {

    let style = {
        transitionDelay: `${index * 0.1}s`
    };

    return <div className="forecast-item__container rotate-in" style={style}>
        <div className="forecast-item__date">
            {weekday}
        </div>
        <div className="forecast-item__date">
            {day}
        </div>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
        <div className="forecast-item__temp">
            {temp}
        </div>
    </div>;
}

const mapStateToProps = () => ({ forecast }) => (forecast);

const mapDispatchToProps = (dispatch) => {
    return {
        dataRequest: () => dispatch(forecastRequest()),
        dataLoaded: (data) => dispatch(forecastLoaded(data)),
        dataError: () => dispatch(forecastError()),
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithOWMService(),
    WithData('getForecastWeather'), // use function like map
    Animated()
)(Forecast);