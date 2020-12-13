import { GET_FILMS } from '../actions/types'

const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_FILMS:
            return action.payload;
        default:
            return state
    }
}