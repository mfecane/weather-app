import { createStore } from 'redux';

const reducer = (state = {
    city: 'Moscow',
    theme: 'warm'
},
    action) => {
    switch (action.type) {
        case 'SELECT_CITY':
            state = { ...state, city: action.city }
            return state;

        case 'SET_THEME':
            state = { ...state, theme: action.theme }
            return state;

        default:
            return state;
    }
}

const store = createStore(reducer);

export { store };