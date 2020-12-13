import moxios from 'moxios';
import { getFilmList } from '../actions/filmsActions';
import { getCharacterList } from '../actions/charactersActions'
import { makeMockStore } from '../utils/testStore';

describe('Get films action', () => {

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    test('Succesful API request calls getFilmList action', () => {

        const films = [
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
        ];

        const expectedAction = [{ type: "GET_FILMS"}]

        const store = makeMockStore({ films: []})

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: { films } });
            });

        return store.dispatch(getFilmList())
        .then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        })
    })
})

describe('Get characters action', () => {

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    test('Succesful API request calls getCharacterList action', () => {

        const characters = [
            {
                "name": "Yoda",
                "height": "123",
                "mass": "123",
                "hair_color": "test",
                "skin_color": "test",
                "eye_color": "test",
                "birth_year": "test",
                "gender": "test",
                "url": "https://swapi.dev/api/characters/" 
            }
        ];

        const expectedAction = [{ type: "GET_CHARACTERS"}]

        const store = makeMockStore({ characters: []})

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: { characters } });

                return store.dispatch(getCharacterList())
                .then(() => {
                    expect(store.getActions()).toEqual(expectedAction);
                })
            });


    })
})