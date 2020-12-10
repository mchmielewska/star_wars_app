import * as types from '../actions/types';
import favouritesReducer from './favouritesReducer'

describe('Favourites Reducer', () => {

    it('Should return default state', () => {
        const newState = favouritesReducer(undefined, {});
        expect(newState).toEqual(
            {
                characters: [],
                films: []
            }
        );
    });

    describe('Favourites Reducer - checking types', () => {

        it('Should return new state if receiving type LIKE_CHARACTER', () => {
            const character = {
                "name": "TestName",
                "height": "123",
                "mass": "123",
                "hair_color": "test",
                "skin_color": "test",
                "eye_color": "test",
                "birth_year": "test",
                "gender": "test",
                "url": "test"
            };

            const newState = favouritesReducer(undefined, {
                type: types.LIKE_CHARACTER,
                payload: character
            });

            expect(newState).toEqual(
                {
                    characters: [character],
                    films: []
                }
            )
        })

        it('Should return new state if receiving type LIKE_FILM', () => {
            const film = {
                "title": "Test Title 2",
                "episode_id": 1,
                "director": "Test test",
                "producer": "Test producer",
                "release_date": "1980-05-17",
            };

            const newState = favouritesReducer(undefined, {
                type: types.LIKE_FILM,
                payload: film
            });

            expect(newState).toEqual(
                {
                    characters: [],
                    films: [film]
                }
            )
        })

    })

})