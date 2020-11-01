import React from 'react';
import Cities from '../Cities';

import './Pages.scss';

const CitiesPage = () => {

    return (
        <div className="app">
            <div className={`app__full-container`}>
                <Cities />
            </div>
        </div>
    );
}

export default CitiesPage;