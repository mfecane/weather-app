import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './Components/Redux'

const update = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>
        , document.getElementById('root'));
}

update();
store.subscribe(update);