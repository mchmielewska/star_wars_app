import axios from 'axios';

const GET_FILMS = 'GET_FILMS';
const GET_FILM = 'GET_FILM';

export const getFilmsList = () => dispatch => {
    axios.get('https://swapi.dev/api/films/')
            .then(
                res => {
                dispatch({
                    type: GET_FILMS,
                    payload: res.data
                });
            })
            .catch(err => {
                // dispatch({
                //     type: GET_ERRORS,
                //     payload: err.res
                // });
            });
}

export const getFilm = (id) => dispatch => {
    axios.get(`https://swapi.dev/api/films/${id}`)
            .then(
                res => {
                dispatch({
                    type: GET_FILM,
                    payload: res.data
                });
            })
            .catch(err => {
                // dispatch({
                //     type: GET_ERRORS,
                //     payload: err.res
                // });
            });
}