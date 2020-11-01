import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './Cities.scss';

export default class Cities extends Component {

    state = {
        cities: [
            { name: 'Moscow', temp: 5, weather: 'Rain', logo: 'logo' },
            { name: 'Saint Petersburg', temp: 5, weather: 'Rain', logo: 'logo' },
            { name: 'Novosibirsk', temp: 5, weather: 'Rain', logo: 'logo' },
            { name: 'Yekaterinburg', temp: 5, weather: 'Rain', logo: 'logo' },
            { name: 'Nizhny Novgorod', temp: 5, weather: 'Rain', logo: 'logo' },
            { name: 'Kazan', temp: 5, weather: 'Rain', logo: 'logo' },
            { name: 'Chelyabinsk', temp: 5, weather: 'Rain', logo: 'logo' },
            { name: 'Omsk', temp: 5, weather: 'Rain', logo: 'logo' },
            { name: 'Samara', temp: 5, weather: 'Rain', logo: 'logo' },
            { name: 'Rostov-on-Don', temp: 5, weather: 'Rain', logo: 'logo' },
            { name: 'Miami', temp: 5, weather: 'Rain', logo: 'logo' }
        ],
        loading: false,
        error: false
    };

    componentDidMount() {
        this.setState({
            loading: true
        });
    }

    render() {
        const { cities } = this.state;

        const elements = cities.map(({ name }) => (
            <Element key={name} name={name} to={`/city/${name}`} />
        ));

        return (
            <div className="cities__container">
                <div className="cities__grid">
                    {elements}
                </div>
            </div>
        )
    }
}

const Element = ({ name }) => (
    <React.Fragment>
        <h2 className="cities__name">
            <Link to={`/city/${name}`}>{name}</Link>
        </h2>
        <div className="cities__temp">
            15
        </div>
    </React.Fragment>
);