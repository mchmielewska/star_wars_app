import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { imgSource } from '../utils/images'
class Films extends Component {

    render() {

        const films = this.props.films;

        function filmsLinks(films) {
            if (!films) {
                return (
                    <div>Loading data...</div>
                )
            } else {
                const charactersLinks = films.map(film => {
                    let charUrl = film.url;
                    let tmp = charUrl.substr(charUrl.length - 2);
                    let id = (tmp.replace('/', ''))
                    return (
                        <li className="film-link" key={film.episode_id} style={{
                            background: `url(${imgSource.find(el => film.episode_id === el.episodeId).img}) no-repeat 25% 25%`,
                          }}>
                            <Link 
                                to={{
                                    pathname: `/films/${id}`
                                }}>
                                {film.title}</Link>
                        </li>)
                })

                return charactersLinks;
            }
        }


        return (
            <div className="center-align">
                <ul className="films-list">
                    { filmsLinks(films) }
                </ul>
            </div>

        )
    }

}


const mapStateToProps = ({ films }) => ({ films })


export default connect(mapStateToProps)(Films);