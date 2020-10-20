const ls = require('localstorage-ttl');

const dayMs = 24 * 60 * 60 * 1000;

export default class WeatherService {

    _apiBase = 'https://api.openweathermap.org/data/2.5/';
    _apiKey = 'ee09c403a1b18f3bc221c981d5a7cf99';
    _units = '&units=metric';

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}&appid=${this._apiKey}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` +
                `, received ${res.status}`);
        }
        return await res.json();
    }

    getCurrentWeather = async (city_name) => {
        let weather = ls.get('currentWeatherCache');
        if (!weather || false) {
            // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
            weather = await this.getResource(`weather?q=${city_name}${this._units}`);
            this._incrementApiCallCount();
            ls.set('currentWeatherCache', weather, dayMs); // cache for a day
        } 
        console.log('Weather dump', weather);
        return this._transformCurrentWeather(weather);
    };

    _transformCurrentWeather = (weatherData) => {
        const {
            dt,
            name,
            main: {
                temp
            },
            weather
        } = weatherData;
        const { id, main, icon } = weather[0];
        return {
            name: name,
            date: dt,
            temp: Math.floor(temp),
            weatherType: id,
            weatherTypeDesc: main,
            icon: icon
        };
    };

    _incrementApiCallCount = () => {
        let count = ls.get('api-call-count');
        count = count !== undefined ? count : 0; 
        count = count + 1;
        ls.set('api-call-count', count, dayMs);
        console.warn(`WARNING: API CALL, YOU ONLY HAVE 1'000 of these. Count ${count}.`);
    }

};


// const exclude = '&exclude=alerts,minutely,hourly,daily'
// const exclude = '';