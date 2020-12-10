import { GET_CHARACTERS, GET_CHARACTER } from '../types'

const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CHARACTERS:
            return action.payload
        case GET_CHARACTER:
            return action.payload.results
        default:
            return state
    }
}