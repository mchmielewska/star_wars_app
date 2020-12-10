import { GET_FILMS, GET_FILM } from '../types'

const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_FILMS:
            return action.payload.results;
        case GET_FILM:
            return action.payload.results;
        default:
            return state
    }
}