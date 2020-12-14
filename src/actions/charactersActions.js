import axios from 'axios';
import { GET_CHARACTERS, GET_ERRORS } from './types'

export const getCharacterList = () => dispatch => {
    const pageSize = 10;

    // first fetch page 1 to get the number of characters...
    axios.get("https://swapi.dev/api/people/?page=1").then(res => {
        const totalCount = res.data.count
        let allUrls = []
        let allCharacterData = res.data.results;

        // ...then check how many pages we have to fetch to get all data
        for (let currentPage = 2; currentPage <= Math.ceil(totalCount / pageSize); currentPage++) {
            allUrls.push(axios.get(`https://swapi.dev/api/people/?page=${currentPage}`))
        }

        axios.all(allUrls).then(results => {
            const localRequestCharacters = results.map(payload => { return payload.data.results })
            const characterArray = localRequestCharacters.flat()
            allCharacterData = allCharacterData.concat(characterArray);

            dispatch({
                type: GET_CHARACTERS,
                payload: allCharacterData
            })
        })
    }).catch(err => {
        dispatch({
            type: GET_ERRORS,
            error: err
        });
    });
}