
export const selectCity = (id) => {
    return { type: 'SELECT_CITY', payload: id };
}

export const setTheme = (theme) => {
    return { type: 'SET_THEME', payload: theme };
}

export const currentWeatherRequest = () => {
    return {
        type: 'FETCH_CURRENT_WEATHER_REQUEST'
    };
}

export const currentWeatherLoaded = (data) => {
    return {
        type: 'FETCH_CURRENT_WEATHER_SUCCESS',
        payload: data
    };
}

export const currentWeatherError = (error) => {
    return {
        type: 'FETCH_CURRENT_WEATHER_FAILURE',
        payload: error
    };
}

export const forecastRequest = () => {
    return {
        type: 'FETCH_FORECAST_REQUEST'
    };
}

export const forecastLoaded = (data) => {
    return {
        type: 'FETCH_FORECAST_SUCCESS',
        payload: data
    };
}

export const forecastError = (error) => {
    return {
        type: 'FETCH_FORECAST_FAILURE',
        payload: error
    };
}

export const hourlyRequest = () => {
    return {
        type: 'FETCH_HOURLY_REQUEST'
    };
}

export const hourlyLoaded = (data) => {
    return {
        type: 'FETCH_HOURLY_SUCCESS',
        payload: data
    };
}

export const hourlyError = (error) => {
    return {
        type: 'FETCH_HOURLY_FAILURE',
        payload: error
    };
}

export const detailsRequest = () => {
    return {
        type: 'FETCH_DETAILS_REQUEST'
    };
}

export const detailsLoaded = (data) => {
    return {
        type: 'FETCH_DETAILS_SUCCESS',
        payload: data
    };
}

export const detailsError = (error) => {
    return {
        type: 'FETCH_DETAILS_FAILURE',
        payload: error
    };
}

