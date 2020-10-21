import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './Cities.scss'

export default class Cities extends Component {

    state = {
        cities: [
            { name: 'Moscow', temp: 5, weather: 'Rain', logo: 'logo' },
            { name: 'Saint-Petersburgh', temp: 5, weather: 'Rain', logo: 'logo' },
            { name: 'Novosibirsk', temp: 5, weather: 'Rain', logo: 'logo' }
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
            <Element name={name} to={`/city/${name}`}/>
        ));

        return (
            <div className="cities__container">
                <div className="cities__grid">
                    <Element name={'Local'} to="/"/>
                    {elements}
                </div>
            </div>
        )
    }
}

const Element = ({ name, to }) => (
    <React.Fragment>
        <h2 className="cities__name">
            <Link to={to}>{name}</Link>
        </h2>
        <div className="cities__temp">
            15
        </div>
    </React.Fragment>
);