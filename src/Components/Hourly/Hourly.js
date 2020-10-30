import React, { Component } from 'react';
import './Hourly.scss';
import WeatherService from '../../Services/WeatherApiService'
import ScrollContainer from 'react-indiana-drag-scroll'
import { WithData } from '../HOC';

function map(x, in_min, in_max, out_min, out_max) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

class Hourly extends Component {
    formatDate(date) {
        const d = new Date(date * 1000);
        return d.getHours() + 'h';
    }

    render() {
        const { theme, data } = this.props;

        let min = 0, max = 0;
        data.forEach((el) => {
            min = el.temp < min ? el.temp : min;
            max = el.temp > max ? el.temp : max;
        });

        return (
            <div className="hourly__container">
                <React.Fragment>
                    <ScrollContainer className="hourly__scrollcontainer">
                        <div className="hourly__scroll">
                            {data.map(({ temp, date, rainChance }, index) => {
                                let height = map(temp, min, max, 100, 180);
                                const dateValue = (index === 0) ? 'Now' : this.formatDate(date);
                                return (
                                    <Element
                                        key={date}
                                        temp={temp}
                                        time={dateValue}
                                        rainChance={rainChance}
                                        height={height}
                                        theme={theme} />
                                );
                            })}
                        </div>
                    </ScrollContainer>
                </React.Fragment>
            </div>
        );
    }
};

const Element = ({ temp, time, height, rainChance, theme }) => {
    const style = {
        height: `${height}px`
    };
    let rain = '';
    if (Number(rainChance) !== 0) {
        rain = (
            <div className="hourly__rain">
                <img src={`https://openweathermap.org/img/wn/10d@2x.png`} alt="" />
                <span className="hourly__rain-percent">{`${rainChance}%`}</span>
            </div>
        );
    }

    return (
        <div className="hourly__element-container">
            <div className={`hourly__element ${theme}`} style={style}>
                <div className="hourly__element-tempgroup">
                    <div className="hourly__temp">{temp}</div>
                    {rain}
                </div>
                <div className="hourly__time">{time}</div>
            </div>
        </div>
    );
};

const { getHourlyWeather } = new WeatherService();

export default WithData(Hourly, getHourlyWeather);