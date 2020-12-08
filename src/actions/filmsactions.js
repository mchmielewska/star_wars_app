import axios from 'axios';

const GET_FILMS = 'GET_FILMS';

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