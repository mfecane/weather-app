import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import './index.scss';
import {ThemeProvider, ThemeConsumer} from './ThemeContext';

ReactDOM.render(<App />, document.getElementById('root'));

export {ThemeProvider, ThemeConsumer};
