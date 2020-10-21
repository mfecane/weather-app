import React, { Component } from 'react';
import './Spinner.scss'

export default class Spinner extends Component {
    render() {
        return (
            <div className="spinner-border spinner" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }
};