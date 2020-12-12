import { shallow } from 'enzyme';
import React from 'react';
import { makeMockStore } from './utils/testStore';
import App from './App';

const initialState = {
    films: [
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
    ]
};

const testStore = () => makeMockStore(initialState);

jest.mock('./store', () => ({
    get store () {
        return testStore();
    }
})
)

describe('App component', () => {

    let component;
    beforeEach(() => {
        component = shallow(<App {...initialState}/>);
    });

    it('Should render without errors', () => {
        const div = component.find('.app-component');
        expect(div.length).toBe(1);
    })

});