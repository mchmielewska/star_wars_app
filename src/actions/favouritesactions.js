import { LIKE_CHARACTER, UNLIKE_CHARACTER, LIKE_FILM, UNLIKE_FILM } from '../types';

export const likeCharacter = (item) => dispatch => {
    dispatch({
        type: LIKE_CHARACTER,
        payload: item
    })
}

export const likeFilm = (item) => dispatch => {
    dispatch({
        type: LIKE_FILM,
        payload: item
    })
}

export const unlikeFilm = (item) => dispatch => {
    dispatch({
        type: UNLIKE_FILM,
        payload: item
    })
}

export const unlikeCharacter = (item) => dispatch => {
    dispatch({
        type: UNLIKE_CHARACTER,
        payload: item
    })
}