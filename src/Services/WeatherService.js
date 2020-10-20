const ls = require('localstorage-ttl');

const dayMs = 24 * 60 * 60 * 1000;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
        await sleep(1000);
        console.log('Weather dump', weather);
        return this._transformCurrentWeather(weather);
    };


    getForecastWeather = async (city_name) => {
        let forecast = ls.get('forecastWeatherCache');
        if (!forecast || false) {
            // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
            forecast = await this.getResource(`forecast?q=${city_name}${this._units}`);
            this._incrementApiCallCount();
            ls.set('forecastWeatherCache', forecast, dayMs); // cache for a day
        }
        await sleep(1500);
        console.log('Forecast dump', forecast);
        return this._transformForecastWeather(forecast);
    };

    _transformCurrentWeather = (weatherData) => {
        const {
            dt,
            name,
            main: {
                temp,
                temp_max,
                temp_min
            },
            weather
        } = weatherData;
        const { id, main, icon } = weather[0];
        return {
            name: name,
            date: dt,
            temp: Math.round(temp),
            weatherType: id,
            weatherTypeDesc: main,
            icon: icon,
            high: Math.round(temp_max),
            low: Math.round(temp_min)
        };
    };

    _transformForecastWeather = ({ list }) => {
        const forecast = [];
        const days = {};
        list.forEach((item) => {
            const { dt, main: { temp }, weather } = item;
            const { id, main, icon } = weather[0];
            const date = new Date(dt * 1000);
            const day = date.getDate();
            const hours = date.getHours();

            const newItem = {
                date: dt,
                temp: Math.round(temp),
                weatherType: id,
                weatherTypeDesc: main,
                icon: icon
            };

            if(days[day] !== undefined) {
                const date2 = new Date(days[day].date * 1000);
                const hours2 = date2.getHours();
                if(Math.abs(hours - 12) < Math.abs(hours2 - 12)) {
                    days[day] = newItem; 
                }
            } else {
                days[day] = newItem;
            }
        });
        for(const p in days) {
            forecast.push(days[p]);
        }
        return forecast;
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