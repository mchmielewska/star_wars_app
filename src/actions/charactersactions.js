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
    




    // let getDataForPage = function(result, page) {
    //     if (page === null)
    //         return;

        
        
    //     axios.get(page).then(
    //         res => {
    //             result.push(res.data);
    //             const next = res.data.next
    //             const index = toDoList.indexOf(page);
    //             toDoList.splice(index, 1);
    //             return next;
    //         }).then(next => { 
    //             getDataForPage(result, next) 
    //             if (toDoList.length === 0) {
    //                 let finalResult = result.reduce( (acc, dataPayload) => acc.concat(dataPayload.results), [])
    //                 dispatch({
    //                     type: GET_CHARACTERS,
    //                     payload: finalResult
    //                 })
    //             }
    //         }).catch(err => {
    //             console.log("costam costam", err);
    //         })
    // }

    // getDataForPage(result, "https://swapi.dev/api/people/?page=1");

    // axios.get('https://swapi.dev/api/people/')
    //         .then(
    //             res => {
    //             dispatch({
    //                 type: GET_CHARACTERS,
    //                 payload: res.data
    //             });
    //         })
    //         .catch(err => {
    //             // dispatch({
    //             //     type: GET_ERRORS,
    //             //     payload: err.res
    //             // });
    //         });
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