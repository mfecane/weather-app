const currentReducer = (state, action) => {
    switch (action.type) {

        case 'FETCH_CURRENT_WEATHER_REQUEST':
            return {
                data: {},
                loading: true,
                error: false
            };

        case 'FETCH_CURRENT_WEATHER_SUCCESS':
            return {
                data: action.payload,
                loading: false,
                error: null
            };

        case 'FETCH_CURRENT_WEATHER_FAILURE':
            return {
                data: [],
                loading: false,
                error: action.payload
            };

        default:
            return state.current;
    }
}

export default currentReducer;