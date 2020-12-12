import React, { Component } from 'react';
import { connect } from 'react-redux';
import { unlikeCharacter, unlikeFilm } from '../actions/favouritesActions';
import { Link } from 'react-router-dom';
class Favourites extends Component {
    render() {
        const favouritedFilms = this.props.favourites.films;
        const favouritedCharacters = this.props.favourites.characters;

        const handleUnlikeFilm = (e, film, favouritedFilms) => {
            e.preventDefault();
            this.props.unlikeFilm(film, favouritedFilms);
        }

        const handleUnlikeCharacter = (e, character, favouritedCharacters) => {
            e.preventDefault();
            this.props.unlikeCharacter(character, favouritedCharacters);
        }

        function filmsLinks(films) {
            if (films === undefined || films.length === 0) {
                return
            } else {
                const filmsLinks = films.map(film => {
                    const charUrl = film.url;
                    const splitUrl = charUrl.split("/");
                    const id = splitUrl[splitUrl.length - 2]; // for example "films/12/" ==> ["films", "12", ""] ==> "12"
                    return (
                        <li key={film.title}>
                            <Link to={{ pathname: `/films/${id}` }}> {film.title} </Link>
                            <button className="like" onClick={(e) => handleUnlikeFilm(e, film, favouritedFilms)}><i className="material-icons">delete</i></button>
                        </li>
                    )
                })

                return filmsLinks;
            }
        }
        const films = filmsLinks(this.props.favourites.films)

        function charactersLinks(characters) {
            if (characters === undefined || characters.length === 0) {
                return
            } else {
                const charactersLinks = characters.map(character => {
                    const charUrl = character.url;
                    const splitUrl = charUrl.split("/");
                    const id = splitUrl[splitUrl.length - 2];
                    return (
                        <li key={character.name}>
                            <Link to={{ pathname: `/characters/${id}` }}> {character.name} </Link>
                            <button className="like" onClick={(e) => handleUnlikeCharacter(e, character, favouritedCharacters)}><i className="material-icons">delete</i></button>
                        </li>
                    )
                })

                return charactersLinks;
            }
        }

        const characters = charactersLinks(this.props.favourites.characters)

        return (
            <div className="favourites container">
                <h4>Films:</h4>
                <ul>{films}</ul>
                <h4>Characters:</h4>
                <ul>{characters}</ul>
            </div>
        )
    }
}

const mapStateToProps = ({ favourites }) => ({ favourites })

const mapDispatchToProps = (dispatch) => {
    return {
        unlikeFilm: (film, favouritedFilms) => dispatch(unlikeFilm(film, favouritedFilms)),
        unlikeCharacter: (character, favouritedCharacters) => dispatch(unlikeCharacter(character, favouritedCharacters))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);