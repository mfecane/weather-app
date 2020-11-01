import React from 'react';
import { OWMConsumer } from '../Context';

const WithOWMService = () => (Wrapped) => {

    return (props) => {
        return (
            <OWMConsumer>
                {
                    (openWeatherMapService) => {
                        return (<Wrapped {...props}
                            service={openWeatherMapService} />);
                    }
                }
            </OWMConsumer>
        );
    }
};

export default WithOWMService;
