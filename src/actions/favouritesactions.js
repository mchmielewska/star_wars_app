const LIKE_CHARACTER = 'LIKE_CHARACTER';
const UNLIKE_CHARACTER = 'UNLIKE_CHARACTER';
const LIKE_FILM = 'LIKE_FILM'
const UNLIKE_FILM = "UNLIKE_FILM"

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