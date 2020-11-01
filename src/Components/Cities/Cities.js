import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Animated from '../HOC/Animated';
import './Cities.scss';

class Cities extends Component {

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

        const elements = cities.map(({ name }, index) => (
            <Element key={name} name={name} to={`/city/${name}`} index={index} />
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

const Element = ({ name, index }) => {

    const style = {
        transitionDelay: `${index * 0.05}s`
    };


    console.log(index);

    return (
        <React.Fragment>
            <h2 className="cities__name slide-left" style={style}>
                <Link to={`/city/${name}`}>{name}</Link>
            </h2>
        </React.Fragment>
    );
};


export default Animated(Cities);