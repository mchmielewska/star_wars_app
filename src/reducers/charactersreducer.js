import { GET_CHARACTERS, GET_CHARACTER } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CHARACTERS:
            return action.payload
        default:
            return state
    }
}