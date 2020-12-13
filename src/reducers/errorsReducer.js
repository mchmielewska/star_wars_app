import { GET_ERRORS } from '../actions/types';

const initialState = {
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        error: action.error,
      }
    default:
      return {
        ...state,
        error: null,
      }
  }
}