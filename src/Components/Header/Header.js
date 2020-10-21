import React from 'react';
import {Link} from 'react-router-dom';
import './Header.scss';

const Header = ({ city, date }) => (
    <div>
        <div className="header__container">
            <h2 className="header__date">{date}</h2>
            <h2 className="header__city">
                <Link to='/cities'><i className="fa fa-map-marker" />{city}</Link>
            </h2>
        </div>
    </div>
);

export default Header;
