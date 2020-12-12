import React, { Component } from 'react';
import { imgSource } from '../utils/images'
import { connect } from 'react-redux';
import { likeFilm, unlikeFilm } from '../actions/favouritesActions';
import { charactersLinks } from '../utils/charactersLinks';

class Film extends Component {
    render() {
        const favourites = this.props.favourites;
        const favouritedFilms = favourites.films;

        const actionButton = film => {
            const favouriteFilmTitles = favourites.films.map( (film) => film.title )
            if (favouriteFilmTitles.includes(film.title)) {
                return (
                    <button className="like" onClick={(e) => handleUnlike(e, film, favouritedFilms)}><i className="material-icons">favorite</i></button>
                )
            } else {
                return (
                    <button className="unlike" onClick={(e) => handleLike(e, film)}><i className="material-icons">favorite_border</i></button>
                )
            }
        }

        const handleLike = (e, film) => {
            e.preventDefault();
            this.props.likeFilm(film);
        }

        const handleUnlike = (e, film, favouritedFilms) => {
            e.preventDefault();
            this.props.unlikeFilm(film, favouritedFilms);
        }

        const film = this.props.currentFilm;
        const allCharacters = this.props.characters;

        const charactersNames = allCharacters.map(character => {
            const charUrl = character.url;
            const splitUrl = charUrl.split("/");
            const id = splitUrl[splitUrl.length - 2]; 

            return {
                id: id,
                name: character.name,
                url: character.url
            }
        })

        const imgSrc = (film) => {
            const imgElement = imgSource.find(el => film.episode_id === el.episodeId);
            const src = imgElement.img
            return src
        }

        const loadingMessage = this.props.filmsLoaded ? "Film not found" : "Loading film...";

        const filmData = film !== undefined ? (
            <div className="container">
                <h4>{film.title} {actionButton(film)}</h4>

                <img className="poster" alt={film.title} src={imgSrc(film)} ></img>
                <div className="details" id={film.episode_id}>
                    <p><span className="details-name">Episode: </span>{film.episode_id}</p>
                    <p><span className="details-name">Release date: </span>{film.release_date}</p>
                    <p><span className="details-name">Director: </span>{film.director}</p>
                    <p><span className="details-name">Producer: </span>{film.producer}</p>
                    <span className="details-name">Openining crawl: </span><pre><code>{film.opening_crawl}</code></pre>
                    <span className="details-name">List of the characters:</span>
                    <ul className="characters-list">{charactersLinks(film.characters, charactersNames)}</ul>
                </div>
                <button className="button grey" onClick={() => { this.props.history.goBack() }}><i className="material-icons">keyboard_arrow_left</i>Back</button>
            </div>
        ) : (
                <div className="container-loading">
                    { loadingMessage }
                </div>
            )

        return (
            <div>
                { filmData }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    let currentFilm, filmsLoaded = false;

    if (state.films && state.films.length > 0) {
        filmsLoaded = true
        currentFilm = state.films.find(film => (film.url.split("/").slice(-2)[0] === id))
    }

    return {
        currentFilm: currentFilm,
        favourites: state.favourites,
        characters: state.characters,
        films: state.films,
        filmsLoaded: filmsLoaded
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        likeFilm: (film) => dispatch(likeFilm(film)),
        unlikeFilm: (film, favouritedFilms) => dispatch(unlikeFilm(film, favouritedFilms))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Film);