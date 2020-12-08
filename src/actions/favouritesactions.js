const LIKE_CHARACTER = 'LIKE_CHARACTER';
const LIKE_FILM = 'LIKE_FILM'

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