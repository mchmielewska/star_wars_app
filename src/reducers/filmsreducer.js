const GET_FILMS = 'GET_FILMS';
const GET_FILM = 'GET_FILM';

const initialState = []

export default function (state = initialState, action ) {
    switch(action.type) {
       case GET_FILMS:
           return action.payload.results;
        case GET_FILM:
            return action.payload.results;             
       default:
           return state
    }
}