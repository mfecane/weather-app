import { createStore } from 'redux';

import currentReducer from './currentReducer';
import forecastReducer from './forecastReducer';
import hourlyReducer from './hourlyReducer';
import detailsReducer from './detailsReducer';


const initialState = {
    current: {
        data: {},
        loading: true,
        error: false
    },
    hourly: {
        data: {},
        loading: true,
        error: false
    },
    forecast: {
        data: {},
        loading: true,
        error: false
    },
    details: {
        data: {},
        loading: true,
        error: false
    },
    theme: 'warm'
};

const themeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_THEME':
            return action.payload;

        default:
            return state.theme;
    }
}

const reducer = (state = initialState, action) => {
    return {
        current: currentReducer(state, action),
        forecast: forecastReducer(state, action),
        hourly: hourlyReducer(state, action),
        details: detailsReducer(state, action),
        theme: themeReducer(state, action)
    };
};

const store = createStore(reducer);

export { store };