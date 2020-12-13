import React, { Component } from 'react';
import { connect } from 'react-redux';
import SingleFilm from './SingleFilm';

export class FilmsList extends Component {

    render() {

        const films = this.props.films;
        const loadingMessage = this.props.filmsLoaded ? "Films not found" : "Loading films...";

        function filmsLinks(films) {
            if (films === undefined || films.length === 0) {
                return (
                    <div className="container-loading no-data">{ loadingMessage }</div>
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
                <div className="center-align films-component">
                    <div className="films-list">
                        {filmsLinks(films)}
                    </div>
                </div>
        )
    }
}


const mapStateToProps = (state) => {
    let filmsLoaded = false, films;
    if (state.films && state.films.length > 0) {
        filmsLoaded = true;
        films = state.films;
    }

    return {
        films,
        filmsLoaded
    }
}

export default connect(mapStateToProps)(FilmsList);