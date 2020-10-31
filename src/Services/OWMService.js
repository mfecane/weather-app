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
        //console.log(storage + '_dump', data);
        await sleep(500);
        return data;
    }

    getCurrentWeather = async ({ city }) => {
        const data = await this.getResource(`weather?q=${city}${this._units}`, 'current_weather_openweathermap_' + city)
        return this._transformCurrentWeather(data);
    };

    getForecastWeather = async ({ city }) => {
        const data = await this.getResource(`forecast?q=${city}${this._units}`, 'forecast_weather_openweathermap' + city)
        return this._transformForecastWeather(data);
    };

    getDetailWeather = async ({ city }) => {
        const data = await this.getResource(`weather?q=${city}${this._units}`, 'detail_weather_openweathermap' + city)
        return this._transformDetailWeather(data);
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
            wind: {
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

            if (days[day] !== undefined) {
                const date2 = new Date(days[day].date * 1000);
                const hours2 = date2.getHours();
                if (Math.abs(hours - 12) < Math.abs(hours2 - 12)) {
                    days[day] = newItem;
                }
            } else {
                days[day] = newItem;
            }
        });
        for (const p in days) {
            forecast.push(days[p]);
        }
        return forecast;
    };

    _transformDetailWeather = (weatherData) => {

        const {
            dt,
            name,
            sys: {
                sunrise,
                sunset
            },
            clouds: {
                all
            },
            main: {
                temp,
                temp_min,
                temp_max,
                pressure,
                humidity,
                feels_like
            },
            wind: {
                speed,
                deg
            },
            rain,
            weather
        } = weatherData;

        const {
            description,
            icon
        } = weather[0];

        let rain1h = null;

        if (rain !== undefined) {
            rain1h = rain['1h'];
        }

        return {
            date: dt,
            city: name,
            sunrise: sunrise,
            sunset: sunset,
            clouds: all,
            weatherDesc: description,
            weatherIcon: icon,
            temp: Math.round(temp),
            temp_min: Math.round(temp_min),
            temp_max: Math.round(temp_max),
            feels_like: Math.round(feels_like),
            pressure: pressure,
            humidity: humidity,
            windSpeed: speed,
            windDeg: deg,
            rain1h: rain1h
        };
    }

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