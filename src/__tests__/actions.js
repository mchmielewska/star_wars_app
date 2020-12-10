import moxios from 'moxios';
import { getFilmsList } from '../actions/filmsActions';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const makeMockStore = (state = {}) => {
    return mockStore({
        ...state
    });
};

describe('Get films action', () => {

    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    test('Succesful API request calls getFilmsList action', () => {

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

        return store.dispatch(getFilmsList())
        .then(() => {
            expect(store.getActions()).toEqual(expectedAction);
        })
    })
})