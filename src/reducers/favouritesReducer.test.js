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

        it('Should return new state if receiving type UNLIKE_FILM', () => {
            const film = {
                "title": "Test Title 2",
                "episode_id": 1,
                "director": "Test test",
                "producer": "Test producer",
                "release_date": "1980-05-17",
            };

            const initialState = {
                films: [
                    {
                        "title": "Test Title 2",
                        "episode_id": 1,
                        "director": "Test test",
                        "producer": "Test producer",
                        "release_date": "1980-05-17",
                    }
                ],
                characters: []
            }
            const films = initialState.films.filter(e => e.title !== film.title)

            const newState = favouritesReducer(undefined, {
                type: types.UNLIKE_FILM,
                payload: films
            });
            
            expect(newState).toEqual(
                {
                    characters: [],
                    films: films
                }
            )
        })

        it('Should return new state if receiving type UNLIKE_CHARACTER', () => {
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

            const initialState = {
                films: [],
                characters: [
                    {
                        "name": "TestName",
                        "height": "123",
                        "mass": "123",
                        "hair_color": "test",
                        "skin_color": "test",
                        "eye_color": "test",
                        "birth_year": "test",
                        "gender": "test",
                        "url": "test"
                    }
                ]
            }
            const characters = initialState.characters.filter(e => e.name !== character.name)

            const newState = favouritesReducer(undefined, {
                type: types.UNLIKE_CHARACTER,
                payload: characters
            });
            
            expect(newState).toEqual(
                {
                    characters: characters,
                    films: []
                }
            )
        })
    })

})