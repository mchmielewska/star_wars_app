import * as types from '../actions/types';
import charactersReducer from './charactersReducer'

describe('Characters Reducer', () => {

    it('Should return default state', () => {
        const newState = charactersReducer(undefined, {});
        expect(newState).toEqual([]);
    });

    describe('Characters Reducer - checking types', () => {

        it('Should return new state if receiving type GET_CHARACTERS', () => {
            const characters = [
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
                },
                {
                    "name": "TestName2",
                    "height": "133",
                    "mass": "213",
                    "hair_color": "test",
                    "skin_color": "test",
                    "eye_color": "test",
                    "birth_year": "test",
                    "gender": "test",
                    "url": "test"
                },
            ];
            const newState = charactersReducer(undefined, {
                type: types.GET_CHARACTERS,
                payload: characters
            });
            expect(newState).toEqual(characters)
        });

        it('Should return new state if receiving type GET_CHARACTER', () => {
            const character =
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
                };
            const newState = charactersReducer(undefined, {
                type: types.GET_CHARACTER,
                payload: character
            });
            expect(newState).toEqual(character)
        })

    })

})