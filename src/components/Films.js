import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { imgSource } from '../utils/images'
class Films extends Component {

    render() {

        const films = this.props.films;

        function filmsLinks(films) {
            if (films === undefined || films.length === 0) {
                return (
                    <div className="container-loading">Loading data...</div>
                )
            } else {
                const filmsLinks = films.map(film => {
                    let charUrl = film.url;
                    let tmp = charUrl.substr(charUrl.length - 2);
                    let id = (tmp.replace('/', ''))
                    return (
                        <div key={id}>
                            <Link className="film-link" style={{
                                background: `url(${imgSource.find(el => film.episode_id === el.episodeId).img}) no-repeat 25% 25%`,
                            }}
                                to={{
                                    pathname: `/films/${id}`
                                }}>
                                <div className="film-title">{film.title}</div>
                            </Link>
                        </div>)
                })

                return filmsLinks;
            }
        }


        return (
            <div className="center-align">
                <div className="films-list">
                    {filmsLinks(films)}
                </div>
            </div>

        )
    }

}


const mapStateToProps = ({ films }) => ({ films })


export default connect(mapStateToProps)(Films);