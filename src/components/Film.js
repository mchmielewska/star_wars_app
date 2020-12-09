import React, { Component } from 'react';
import { imgSource } from '../utils/images'
import { connect } from 'react-redux';
import { getFilm } from '../actions/filmsactions';
import { likeFilm } from '../actions/favouritesactions';
import { charactersLinks } from '../utils/characterslinks';

class Film extends Component {

    render() {

        const handleLike = (e, film) => {
            e.preventDefault();
            this.props.likeFilm(film);
        }

        const film = this.props.currentFilm;
        const allCharacters = this.props.characters

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

        return (
            <div>
                            <h5>{film.title}</h5>
                            <button onClick={(e) => handleLike(e, film)}>Like!</button>
                            <div className="film-details" id={film.episode_id}>
                                <img className="poster" alt={film.title} src={imgSource.find(el => film.episode_id === el.episodeId).img} ></img>
                                <p>{film.episode_id}</p>
                                <p>{film.release_date}</p>
                                <p>{film.director}</p>
                                <p>{film.producer}</p>
                                <p>{film.opening_crawl}</p>
                                <ul>{charactersLinks(film.characters, charactersNames)}</ul>
                            </div>
            </div>

        )
    }

}


const mapStateToProps= (state, ownProps) => {
    let id = ownProps.match.params.id; 
    
    if (state.characters.length === 0) {
        getFilm(id);
        return {
            currentFilm: state.films,
            favourites: state.favourites
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
        likeFilm: (film) => dispatch(likeFilm(film))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Film);