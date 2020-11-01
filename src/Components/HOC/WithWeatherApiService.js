import React from 'react';
import { WeatherAPIConsumer } from '../Context';

const WithWeatherApiService = () => (Wrapped) => {

    return (props) => {
        return (
            <WeatherAPIConsumer>
                {
                    (service) => {
                        return (<Wrapped {...props}
                            service={service} />);
                    }
                }
            </WeatherAPIConsumer>
        );
    }
};

export default WithWeatherApiService;
