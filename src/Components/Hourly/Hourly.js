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

        const elements = data.map(({ temp, date }, index) => {
            let height = map(temp, min, max, 70, 120);
            const dateValue = (index === 0) ? 'Now' : this.formatDate(date);
            return (
                <Element
                    key={date}
                    temp={temp}
                    time={dateValue}
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

const Element = ({ temp, time, height }) => {
    const style = {
        height: `${height}px`
    };
    return (
        <div className="hourly__element-container">
            <div className="hourly__element" style={style}>
                <div className="hourly__temp">{temp}</div>
                <div className="hourly__time">{time}</div>
            </div>
        </div>
    );
};