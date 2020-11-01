import React from 'react'

const {
    Provider: OWMProvider,
    Consumer: OWMConsumer
} = React.createContext();

const {
    Provider: WeatherAPIProvider,
    Consumer: WeatherAPIConsumer
} = React.createContext();

export {
    OWMProvider,
    OWMConsumer,
    WeatherAPIProvider,
    WeatherAPIConsumer
};