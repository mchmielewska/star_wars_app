import { LIKE_CHARACTER, LIKE_FILM, UNLIKE_FILM, UNLIKE_CHARACTER } from '../actions/types';

const initialState = {
    characters: [],
    films: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LIKE_CHARACTER:
            return {
                ...state,
                characters: [...state.characters, action.payload]
            }
        case LIKE_FILM:
            return {
                ...state,
                films: [...state.films, action.payload]
            }
        case UNLIKE_FILM:
            return {
                ...state,
                films: action.payload
            }
        case UNLIKE_CHARACTER:
            return {
                ...state,
                characters: action.payload
            }
        default:
            return state
    }
}