import { GET_ERRORS } from '../types';

const initialState = {
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        error: {
          errorMessage: action.error,
          ...action.payload.response.data,
        },
      }
    default:
      return {
        ...state,
        error: null,
      }
  }
}