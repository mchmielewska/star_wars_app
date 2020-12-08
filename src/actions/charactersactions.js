import axios from 'axios';

const GET_CHARACTERS = 'GET_CHARACTERS';
const GET_CHARACTER = 'GET_CHARACTER';

export const getCharactersList = () => dispatch => {
    let pageSize = 10;

    axios.get("https://swapi.dev/api/people/?page=1").then( res => {
        const totalCount = res.data.count
        let allUrls = []
        let allCharacterData = res.data.results;
        for (let currentPage = 2; currentPage <= Math.ceil(totalCount/pageSize); currentPage++) {
            allUrls.push(axios.get(`https://swapi.dev/api/people/?page=${currentPage}`))
        }

        axios.all(allUrls).then(results => {
            let tmp = results.map(payload => { return payload.data.results })
            let flat = tmp.flat()
            allCharacterData = allCharacterData.concat(flat);

            dispatch({
                type: GET_CHARACTERS,
                payload: allCharacterData
            })
        })
    })
}

export const getCharacter = (id) => dispatch => {
    axios.get(`https://swapi.dev/api/people/${id}`)
        .then(
            res => {
                dispatch({
                    type: GET_CHARACTER,
                    payload: res.data
                })
            }
        )
}