const LIKE_CHARACTER = 'LIKE_CHARACTER'
const LIKE_FILM = 'LIKE_FILM'
const REMOVE_LIKE = 'REMOVE_LIKE'

const initialState = {
    characters: [],
    films: []
}

export default function (state = initialState, action ) {
    switch(action.type) {
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
        case REMOVE_LIKE:
            return state       
       default:
           return state
    }
}