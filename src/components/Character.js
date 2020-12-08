import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCharacter } from '../actions/charactersactions';

class Character extends Component {

    render() {
        const character = this.props.currentCharacter;

        return (
            <div>
                <h3>{ character.name }</h3>
                <p>birth year: { character.birth_year }</p>
                <p>eye color: { character.eye_color }</p>
                <p>gender: { character.gender }</p>
                <p>hair color: { character.hair_color }</p>
                <p>skin color: { character.skin_color }</p>
            </div>
        )

    }
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    
    if (state.characters.length === 0) {
        getCharacter(id);
        return {
            currentCharacter: state.characters
        }
    } else {
        return {
            currentCharacter: state.characters.find(character => (((character.url).substr(character.url.length - 3)).replace('/','')).replace('/','') === id)
        }
    }
}

export default connect(mapStateToProps)(Character)