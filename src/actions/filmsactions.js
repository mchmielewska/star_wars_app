import axios from 'axios';
import { GET_FILM, GET_FILMS, GET_ERRORS } from '../types';

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
            dispatch({
                type: GET_ERRORS,
                error: err
            });
        });
}

export const getFilm = (id) => dispatch => {
    axios.get(`https://swapi.dev/api/films/${id}`)
        .then(
            res => {
                console.log(res)
                dispatch({
                    type: GET_FILM,
                    payload: res.data
                });
            })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                error: err
            });
        });
}