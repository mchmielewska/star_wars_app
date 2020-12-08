const GET_CHARACTERS = 'GET_CHARACTERS';
const GET_CHARACTER = 'GET_CHARACTER'

const initialState = []

export default function (state = initialState, action ) {
    switch(action.type) {
       case GET_CHARACTERS:
            return action.payload
        case GET_CHARACTER:
            return action.payload.results           
       default:
           return state
    }
}