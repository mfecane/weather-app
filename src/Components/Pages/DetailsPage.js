
import React from 'react';
import { withRouter } from 'react-router-dom';
import Details from '../Details';

const DetailsPage = withRouter(({ match }) => {
    let { id } = match.params;
    if (!id) {
        id = 'Moscow';
    }
    return (<div className="app">
        <div className={`app__full-container--grad`}>
            <Details param={{ city: id }} />
        </div>
    </div>);
});

export default DetailsPage;