import React, { Component } from 'react';
import { connect } from 'react-redux';
import { likeCharacter, unlikeCharacter } from '../actions/favouritesActions';
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
            if (character === undefined) {
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

        const loadingMessage = this.props.charactersLoaded ? "Character not found" : "Loading character...";
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
        ) : (<div className="container-loading">{loadingMessage}</div>)

        return (
            <div>
                { characterData }
            </div>
        )

    }
}

const mapStateToProps = (state, ownProps) => {
    let currentCharacter, charactersLoaded = false; 

    if (state.characters && state.characters.length > 0) {
        const id = ownProps.match.params.id;
        charactersLoaded = true;
        currentCharacter = state.characters.find(character => (character.url.split("/").slice(-2)[0] === id))
    }

    return {
        currentCharacter: currentCharacter,
        favourites: state.favourites,
        charactersLoaded: charactersLoaded
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        likeCharacter: (character) => dispatch(likeCharacter(character)),
        unlikeCharacter: (character, favouritedCharacters) => dispatch(unlikeCharacter(character, favouritedCharacters))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Character)