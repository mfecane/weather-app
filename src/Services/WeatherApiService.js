const ls = require('localstorage-ttl');

const dayMs = 24 * 60 * 60 * 1000;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default class WeatherApiService {

    _apiBase = 'http://api.weatherapi.com/v1/';
    _apiKey = '3ad9b2d2abb245dbb8e205619202010';

    getResource = async (param, storage) => {
        let data = ls.get(storage);
        if (!data || false) {
            //'http://api.weatherapi.com/v1/forecast.json?key=3ad9b2d2abb245dbb8e205619202010&q=Moscow&days=3'
            const res = await fetch(`${this._apiBase}${param}`);
            if (!res.ok) {
                throw new Error(`Could not fetch ${param}, received ${res.status}`);
            }
            data = await res.json();
            this._incrementApiCallCount();
            ls.set(storage, data, dayMs);
        }
        // console.log(storage + '_dump', data);
        await sleep(1000);
        return data;
    }

    getCurrentWeather = async (city_name) => {
        const data = await this.getResource(`current.json?key=${this._apiKey}&q=${city_name}&days=5`, 'current_weather_weatherapi')
        return this._transformCurrentWeather(data);
    };

    getForecastWeather = async (city_name) => {
        const data = await this.getResource(`forecast.json?key=${this._apiKey}&q=${city_name}&days=5`, 'forecast_weather_weatherapi')
        return this._transformForecastWeather(data);
    };

    getHourlyWeather = async (city_name) => {
        const data = await this.getResource(`forecast.json?key=${this._apiKey}&q=${city_name}&days=3`, 'hourly_weather_weatherapi')
        return this._transformHourlytWeather(data);
    }

    _transformCurrentWeather = (weatherData) => {
        const {
            location: {
                name,
            },
            current: {
                condition: {
                    code,
                    icon,
                    text
                },
                last_updated_epoch,
                temp_c,
            }
        } = weatherData;
        return {
            name: name,
            date: last_updated_epoch,
            temp: Math.round(temp_c),
            weatherType: code,
            weatherTypeDesc: text,
            weatherTypeIcon: icon,
            high: Math.round(0),
            low: Math.round(0)
        };
    };

    _transformForecastWeather = (forecastData) => {
        return forecastData;
    };

    _transformHourlytWeather = ({ forecast: { forecastday }, current: { last_updated_epoch } }) => {
        const arr = [];
        forecastday.forEach(({ hour }) => {
            hour.forEach(({ time_epoch,time, temp_c, chance_of_rain }) => {
                if (arr.length >= 24) {
                    return;
                }
                if (time_epoch > last_updated_epoch) {
                    arr.push(
                        {
                            date: time_epoch,
                            time: time,
                            temp: Math.round(temp_c),
                            rainChance: chance_of_rain
                        }
                    );
                }
            });
        });
        return arr;
    }

    _incrementApiCallCount = () => {
        let count = ls.get('api-call-count');
        count = count !== undefined ? count : 0;
        count = count + 1;
        ls.set('api-call-count', count, dayMs);
        console.warn(`WARNING: API CALL, YOU ONLY HAVE 1'000'000 of these. Count ${count}.`);
    }

};


// const exclude = '&exclude=alerts,minutely,hourly,daily'
// const exclude = '';