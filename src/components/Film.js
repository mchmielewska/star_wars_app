import React, { Component } from 'react';
import { imgSource } from '../utils/images'
import { connect } from 'react-redux';
import { getFilm } from '../actions/filmsactions';
import { getCharactersList } from '../actions/charactersactions';
import { likeFilm, unlikeFilm } from '../actions/favouritesactions';
import { charactersLinks } from '../utils/characterslinks';

class Film extends Component {

    render() {

        const favourites = this.props.favourites;

        const actionButton = film => {
            if (favourites.films.includes(film)) {
                return (
                    <button className="like" onClick={(e) => handleUnlike(e, film)}><i className="material-icons">favorite</i></button>
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

        const handleUnlike = (e, film) => {
            e.preventDefault();
            this.props.unlikeFilm(film);
        }

        const film = this.props.currentFilm;
        const allCharacters = this.props.characters;

        const charactersNames = allCharacters.map(character => {
            let charUrl = character.url;
            let tmp = charUrl.substr(charUrl.length - 3);
            let id = (tmp.replace('/', '')).replace('/', '')

            return {
                id: id,
                name: character.name,
                url: character.url
            }
        }
        )

        const imgSrc = (film) => {
            const imgElement = imgSource.find(el => film.episode_id === el.episodeId);
            const src = imgElement.img
            return src
        }

        const filmData = film !== undefined ? (
            <div className="container">
                            <h4>{film.title} { actionButton(film) }</h4>
                            
                            <img className="poster" alt={film.title} src={ imgSrc(film) } ></img>
                            <div className="details" id={film.episode_id}>
                                <p><span className="details-name">Episode: </span>{film.episode_id}</p>
                                <p><span className="details-name">Release date: </span>{film.release_date}</p>
                                <p><span className="details-name">Director: </span>{film.director}</p>
                                <p><span className="details-name">Producer: </span>{film.producer}</p>
                                <span className="details-name">Openining crawl: </span><pre><code>{film.opening_crawl}</code></pre>
                                <span className="details-name">List of the characters:</span>
                                <ul>{charactersLinks(film.characters, charactersNames)}</ul>
                            </div>
                            <button className="button grey" onClick={() => { this.props.history.goBack()}}><i className="material-icons">keyboard_arrow_left</i>Back</button>
            </div>
        ) : ( 
            <div className="container-loading">
                Loading data...
            </div>
            )

            return ( 
                <div>
                    { filmData }
                </div>
            )
}
}

const mapStateToProps= (state, ownProps) => {
    let id = ownProps.match.params.id; 
    
    if (state.films.length === 0) {
        getFilm(id);
        getCharactersList();
        return {
            currentFilm: state.films,
            favourites: state.favourites,
            characters: state.characters
        }
    } else {
        return {
            currentFilm: state.films.find(film => (((film.url).substr(film.url.length - 3)).replace('/','')).replace('/','') === id),
            characters: state.characters,
            favourites: state.favourites
        }
    }
}
    

const mapDispatchToProps = (dispatch) => {
    return {
        getFilm: (id) => dispatch(getFilm(id)),
        likeFilm: (film) => dispatch(likeFilm(film)),
        unlikeFilm: (film) => dispatch(unlikeFilm(film))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Film);