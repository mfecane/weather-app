import React, { Component } from 'react';
import './Hourly.scss';
import WeatherService from '../../Services/WeatherApiService'
import ScrollContainer from 'react-indiana-drag-scroll'
import Spinner from '../Spinner';

function map(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

export default class Hourly extends Component {

    weatherService = new WeatherService();

    state = {
        data: [],
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
        //this.interval = setInterval(this.componentUpdate, 10 * 60 * 1000);
    }

    componentWillUnmount() {
        //clearInterval(this.interval);
    }

    componentUpdate = () => {
        this.setState({
            error: false
        });
        this.weatherService
            .getHourlyWeather("Moscow")
            .then(this.onWeatherLoaded)
            .catch(this.onError);
    }

    onWeatherLoaded = (data) => {
        this.setState({
            data,
            loading: false,
            error: false
        });
    }

    formatDate(date) {
        const d = new Date(date * 1000);
        return d.getHours() + 'h';
    }

    render() {
        const { data, loading, error } = this.state;

        let min = 0, max = 0;
        data.forEach((el) => {
            min = el.temp < min ? el.temp : min;
            max = el.temp > max ? el.temp : max;
        });

        const elements = data.map(({ temp, date, rainChance }, index) => {
            let height = map(temp, min, max, 85, 150);
            const dateValue = (index === 0) ? 'Now' : this.formatDate(date);
            return (
                <Element
                    key={date}
                    temp={temp}
                    time={dateValue}
                    rainChance={rainChance}
                    height={height} />
            );
        });

        const hasData = !(loading || error);

        const errorMessage = error ? <div>{'error'}</div> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = hasData ? (
            <React.Fragment>
                <ScrollContainer className="hourly__scrollcontainer">
                    <div className="hourly__scroll">
                        {elements}
                    </div>
                </ScrollContainer>
            </React.Fragment>
        ) : null;

        return (
            <div className="hourly__container">
                {content}
                {errorMessage}
                {spinner}
            </div>
        );
    }
};

const Element = ({ temp, time, height, rainChance }) => {
    const style = {
        height: `${height}px`
    };
    let rain = '';
    if (rainChance != 0) {
        rain = (
            <div className="hourly__rain">
                <img src={`http://openweathermap.org/img/wn/10d@2x.png`} />
                <span className="hourly__rain-percent">{`${rainChance}%`}</span>
            </div>
        );
    }

    return (
        <div className="hourly__element-container">
            <div className="hourly__element" style={style}>
                <div className="hourly__element-tempgroup">
                    <div className="hourly__temp">{temp}</div>
                    {rain}
                </div>
                <div className="hourly__time">{time}</div>
            </div>
        </div>
    );
};