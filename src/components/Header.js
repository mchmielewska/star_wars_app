import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Header extends Component {
    render() {
        return (
            
            <div className="nav center-align">
                <h2>Star Wars</h2>
                <ul className="nav-list">
                    <li>
                        <Link className="button button-clear" to="/">Films</Link>
                    </li>
                    <li>
                        <Link className="button button-clear" to="/favourites">Favourites</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Header