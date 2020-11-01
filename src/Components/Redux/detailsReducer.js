const detailsReducer = (state, action) => {
    switch (action.type) {

        case 'FETCH_DETAILS_REQUEST':
            return {
                data: {},
                loading: true,
                error: false
            };

        case 'FETCH_DETAILS_SUCCESS':
            return {
                data: action.payload,
                loading: false,
                error: null
            };

        case 'FETCH_DETAILS_FAILURE':
            return {
                data: [],
                loading: false,
                error: action.payload
            };

        default:
            return state.details;
    }
}

export default detailsReducer;