const LIKE_CHARACTER = 'LIKE_CHARACTER'
const LIKE_FILM = 'LIKE_FILM'
const UNLIKE_FILM = 'UNLIKE_FILM'
const UNLIKE_CHARACTER = 'UNLIKE_CHARACTER'

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
        case UNLIKE_FILM:
            const title = action.payload.title;
            console.log(title)
            let filteredFilms = (state.films).filter(e => e.title !== title)
            console.log(filteredFilms)
            return {
                ...state,
                films: filteredFilms
            }
        case UNLIKE_CHARACTER:
            const name = action.payload.name;
            let filteredCharacters = (state.characters).filter(e => e.name !== name)
            console.log(filteredCharacters)
            return {
                ...state,
                characters: filteredCharacters
            }       
       default:
           return state
    }
}