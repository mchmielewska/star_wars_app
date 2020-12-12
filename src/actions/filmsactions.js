import axios from 'axios';
import { GET_FILMS, GET_ERRORS } from './types';

export function getFilmList() {
    return (dispatch) => {
        return axios.get('https://swapi.dev/api/films/')
        .then(
            res => {
                dispatch({
                    type: GET_FILMS,
                    payload: res.data.results
                });
            })
        .catch(err => {
            console.log(err);
            dispatch({
                type: GET_ERRORS,
                error: err
            });
        });
}}