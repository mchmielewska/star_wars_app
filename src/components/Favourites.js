import React, { Component } from 'react';
import { connect } from 'react-redux';

class Favourites extends Component {
    render() {
        console.log(this.props.favourites)

        const films = this.props.favourites.films.map(film => {
            return (
                <li key={film.title}>{film.title}</li>
            )
        })

        const characters = this.props.favourites.characters.map(character => {
            return (
                <li key={character.name}>{character.name}</li>
            )
        })

        return (
            <div className="container">
                <h4>Films:</h4>
                <ul>{ films }</ul>
                <h4>Characters:</h4>
                <ul>{ characters }</ul>
            </div>
        )
    }
}

const mapStateToProps = ({ favourites }) => ({ favourites })

export default connect(mapStateToProps)(Favourites);