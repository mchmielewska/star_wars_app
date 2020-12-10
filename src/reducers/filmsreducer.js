import { GET_FILMS, GET_FILM } from '../actions/types'

const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_FILMS:
            return action.payload;
        case GET_FILM:
            return action.payload;
        default:
            return state
    }
}