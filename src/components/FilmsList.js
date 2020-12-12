import React, { Component } from 'react';
import { connect } from 'react-redux';
import SingleFilm from './SingleFilm';

class FilmsList extends Component {

    render() {

        const films = this.props.films;

        function filmsLinks(films) {
            if (films === undefined || films.length === 0) {
                return (
                    <div className="container-loading">Loading data...</div>
                )
            } else {
                const filmsLinks = films.map(film => {
                    const filmData = {
                        title: film.title,
                        episode_id: film.episode_id,
                        url: film.url
                    }
                    return <SingleFilm { ...filmData } />
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


export default connect(mapStateToProps)(FilmsList);