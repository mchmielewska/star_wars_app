import React, { Component } from 'react';
import { connect } from 'react-redux';
import { unlikeCharacter, unlikeFilm } from '../actions/favouritesactions';
import { Link } from 'react-router-dom';
class Favourites extends Component {
    render() {

        const handleUnlikeFilm = (e, film) => {
            e.preventDefault();
            this.props.unlikeFilm(film);
        }

        const handleUnlikeCharacter = (e, character) => {
            e.preventDefault();
            this.props.unlikeCharacter(character);
        }

        function filmsLinks(films) {
            if (films === undefined || films.length === 0) {
                return
            } else {
                const filmsLinks = films.map(film => {
                    let charUrl = film.url;
                    let tmp = charUrl.substr(charUrl.length - 2);
                    let id = (tmp.replace('/', ''))
                    return (
                        <li key={film.title}>
                            <Link to={{ pathname: `/films/${id}` }}> {film.title} </Link>
                            <button className="like" onClick={(e) => handleUnlikeFilm(e, film)}><i className="material-icons">delete</i></button>
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
                    let charUrl = character.url;
                    let tmp = (charUrl.substr(charUrl.length - 3)).replace('/', '');
                    let id = (tmp.replace('/', ''))
                    console.log(id)
                    return (
                        <li key={character.name}>
                            <Link to={{ pathname: `/characters/${id}` }}> {character.name} </Link>
                            <button className="like" onClick={(e) => handleUnlikeCharacter(e, character)}><i className="material-icons">delete</i></button>
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
        unlikeFilm: (film) => dispatch(unlikeFilm(film)),
        unlikeCharacter: (character) => dispatch(unlikeCharacter(character))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);