const ls = require('localstorage-ttl');

const dayMs = 24 * 60 * 60 * 1000;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default class OWMService {

    _apiBase = 'https://api.openweathermap.org/data/2.5/';
    _apiKey = 'ee09c403a1b18f3bc221c981d5a7cf99';
    _units = '&units=metric';

    getResource = async (param, storage) => {
        let data = ls.get(storage);
        if (!data || false) {
            const res = await fetch(`${this._apiBase}${param}&appid=${this._apiKey}`);
            if (!res.ok) {
                throw new Error(`Could not fetch ${param}, received ${res.status}`);
            }
            data = await res.json();
            this._incrementApiCallCount();
            ls.set(storage, data, dayMs);
        }
        console.log(storage + '_dump', data);
        await sleep(1000);
        return data;
    }

    getCurrentWeather = async (city_name) => {
        const data = await this.getResource(`weather?q=${city_name}${this._units}`, 'current_weather_openweathermap')
        return this._transformCurrentWeather(data);
    };

    getForecastWeather = async (city_name) => {
        const data = await this.getResource(`forecast?q=${city_name}${this._units}`, 'forecast_weather_openweathermap')
        return this._transformForecastWeather(data);
    };

    _transformCurrentWeather = (weatherData) => {
        const {
            dt,
            name,
            main: {
                temp,
                temp_max,
                temp_min,
                humidity
            },
            weather,
            wind:{
                speed
            }
        } = weatherData;

        const { main, icon } = weather[0];
        return {
            name: name,
            date: dt,
            temp: Math.round(temp),
            desc: main,
            icon: icon,
            high: Math.round(temp_max),
            low: Math.round(temp_min),
            wind: speed,
            humidity: humidity
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