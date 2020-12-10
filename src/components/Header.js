import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header-component">
            <div className="nav center-align">
                <h2 className="nav-header">Star Wars</h2>
                <ul className="nav-list">
                    <li>
                        <Link className="button button-clear" to="/">Films</Link>
                    </li>
                    <li>
                        <Link className="button button-clear" to="/favourites">Favourites</Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header;
