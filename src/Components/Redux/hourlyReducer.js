const hourlyReducer = (state, action) => {
    switch (action.type) {

        case 'FETCH_HOURLY_REQUEST':
            return {
                data: {},
                loading: true,
                error: false
            };

        case 'FETCH_HOURLY_SUCCESS':
            return {
                data: action.payload,
                loading: false,
                error: null
            };

        case 'FETCH_HOURLY_FAILURE':
            return {
                data: [],
                loading: false,
                error: action.payload
            };

        default:
            return state.hourly;
    }
}

export default hourlyReducer;