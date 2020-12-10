import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCharacter } from '../actions/charactersActions';
import { likeCharacter, unlikeCharacter, unlikeFilm } from '../actions/favouritesActions';
import { imgSourceCharacters } from '../utils/images'

class Character extends Component {

    render() {
        const character = this.props.currentCharacter;
        const favourites = this.props.favourites;
        const favouritedCharacters = favourites.characters;

        const actionButton = character => {
            if (favourites.characters.includes(character)) {
                return (
                    <button className="like" onClick={(e) => handleUnlike(e, character, favouritedCharacters)}><i className="material-icons">favorite</i></button>
                )
            } else {
                return (
                    <button className="unlike" onClick={(e) => handleLike(e, character)}><i className="material-icons">favorite_border</i></button>
                )
            }
        }

        const handleLike = (e, character) => {
            e.preventDefault();
            this.props.likeCharacter(character);
        }

        const handleUnlike = (e, character, favouritedCharacters) => {
            e.preventDefault();
            this.props.unlikeCharacter(character, favouritedCharacters);
        }

        const characterImage = (character) => {
            if (character.length === 0) {
                return (
                    <p>Loading image...</p>
                )
            } else { 
                const imgElement = (imgSourceCharacters.find(el => character.name === el.name));
                const src = imgElement.img;

                return (
                    <img className="poster" alt={character.name} src={ src } ></img>
                )
             }
        }


        const characterData = character !== undefined ? (
            <div className="container">
                <button className="button" onClick={() => { this.props.history.goBack() }}><i className="material-icons">keyboard_arrow_left</i>Back</button>
                <h3>{character.name} {actionButton(character)}</h3>
                { characterImage(character) }
                <div className="details">
                    <p><span className="details-name">birth year:</span> {character.birth_year}</p>
                    <p><span className="details-name">eye color:</span> {character.eye_color}</p>
                    <p><span className="details-name">gender:</span> {character.gender}</p>
                    <p><span className="details-name">hair color:</span> {character.hair_color}</p>
                    <p><span className="details-name">skin color:</span> {character.skin_color}</p>
                </div>
            </div>
        ) : (<div className="container-loading">Character not found</div>)

        return (
            <div>
                { characterData }
            </div>
        )

    }
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    if (state.characters.length === 0) {
        getCharacter(id);
        return {
            currentCharacter: state.characters,
            favourites: state.favourites
        }
    } else {
        return {
            currentCharacter: state.characters.find(character => (((character.url).substr(character.url.length - 3)).replace('/', '')).replace('/', '') === id),
            favourites: state.favourites
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        likeCharacter: (character) => dispatch(likeCharacter(character)),
        unlikeCharacter: (character, favouritedCharacters) => dispatch(unlikeCharacter(character, favouritedCharacters))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Character)