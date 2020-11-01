const forecastReducer = (state, action) => {
    switch (action.type) {

        case 'FETCH_FORECAST_REQUEST':
            return {
                data: {},
                loading: true,
                error: false
            };

        case 'FETCH_FORECAST_SUCCESS':
            return {
                data: action.payload,
                loading: false,
                error: null
            };

        case 'FETCH_FORECAST_FAILURE':
            return {
                data: [],
                loading: false,
                error: action.payload
            };

        default:
            return state.forecast;
    }
}

export default forecastReducer;