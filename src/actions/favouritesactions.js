import { LIKE_CHARACTER, UNLIKE_CHARACTER, LIKE_FILM, UNLIKE_FILM } from './types';

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

export const unlikeFilm = (item, all) => dispatch => {
    const title = item.title;
    let filteredFilms = all.filter(e => e.title !== title)
    dispatch({
        type: UNLIKE_FILM,
        payload: filteredFilms
    })
}

export const unlikeCharacter = (item, all) => dispatch => {
    const name = item.name;
    let filteredCharacters = all.filter(e => e.name !== name)
    dispatch({
        type: UNLIKE_CHARACTER,
        payload: filteredCharacters
    })
}