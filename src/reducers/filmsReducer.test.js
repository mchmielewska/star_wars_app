import * as types from '../actions/types';
import filmsReducer from './filmsReducer'

describe('Films Reducer', () => {

    it('Should return default state', () => {
        const newState = filmsReducer(undefined, {});
        expect(newState).toEqual([]);
    });

    describe('Films Reducer - checking types', () => {

        it('Should return new state if receiving type GET_FILMS', () => {
            const films = {
                "count": 6, 
                "next": null, 
                "previous": null, 
                "results": [
                    {
                        "title": "Test Title", 
                        "episode_id": 3, 
                        "director": "Test test", 
                        "producer": "Test producer", 
                        "release_date": "1985-05-17", 
                    }, 
                    {
                        "title": "Test Title 2", 
                        "episode_id": 1, 
                        "director": "Test test", 
                        "producer": "Test producer", 
                        "release_date": "1980-05-17", 
                    }
                ]};

            const newState = filmsReducer(undefined, {
                type: types.GET_FILMS,
                payload: films.results
            });

            expect(newState).toEqual(films.results)
        });

        it('Should return new state if receiving type GET_FILM', () => {
            const film =
                    {
                        "title": "Test Title 2", 
                        "episode_id": 1, 
                        "director": "Test test", 
                        "producer": "Test producer", 
                        "release_date": "1980-05-17", 
                    };
            const newState = filmsReducer(undefined, {
                type: types.GET_FILM,
                payload: film
            });
            expect(newState).toEqual(film)
        })

    })

})