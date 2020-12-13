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
    const unlikedTitle = item.title;
    const likedFilms = all.filter(e => e.title !== unlikedTitle)
    dispatch({
        type: UNLIKE_FILM,
        payload: likedFilms
    })
}

export const unlikeCharacter = (item, all) => dispatch => {
    const unlikedName = item.name;
    const likedCharacters = all.filter(e => e.name !== unlikedName)
    dispatch({
        type: UNLIKE_CHARACTER,
        payload: likedCharacters
    })
}