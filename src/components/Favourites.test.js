import React from 'react';
import Enzyme from "enzyme";
import { shallow, mount } from 'enzyme';
import { Favourites } from './Favourites';
import { Provider } from 'react-redux';
import { makeMockStore } from '../utils/testStore';
import { BrowserRouter as Router } from 'react-router-dom';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

const initialState = {};
const testStore = () => makeMockStore(initialState);

describe('Favourites Component', () => {

    let props;
    let component;
    
    describe('Component not connected to the state', () => {
        describe('Favourites not passed to the component', () => {
            it('Should render without problems', () => {
                props = {
                };
                component = shallow(<Favourites {...props} />);
                
                const wrapper = component.find('.favourites-component');
                expect(wrapper.length).toBe(1);
            })
    
            it('Should not render favourited films', () => {
                const favouritedFilmsList = component.find('.favourited-films');
                expect(favouritedFilmsList.text().length).toBe(0);
            });
            
            it('Should not render favourited characters', () => {
                const favouritedCharactersList = component.find('.favourited-characters');
                expect(favouritedCharactersList.text().length).toBe(0);
             })
        })

        describe('Favourites passed as props to the component', () => {

            const favourites = {
                films: [
                    {
                        title: 'Test title 2',
                        episode_id: 3,
                        url: 'https://swapi.dev/api/films/4/',
                        director: "Test test", 
                        producer: "Test producer", 
                        release_date: "1985-05-17"
                    },
                    {
                        title: 'Test title 1',
                        episode_id: 1,
                        url: 'https://swapi.dev/api/films/2/',
                        director: "Test test", 
                        producer: "Test producer", 
                        release_date: "1985-05-17"
                    }
                ],
                characters: [
                    {
                        "name": "Yoda",
                        "height": "123",
                        "mass": "123",
                        "hair_color": "test",
                        "skin_color": "test",
                        "eye_color": "test",
                        "birth_year": "test",
                        "gender": "test",
                        "url": "https://swapi.dev/api/people/1/" 
                }
                ]

            };

            it('Should render without problems', () => {
                props = {
                    favourites: favourites
                };
                component = shallow(<Favourites {...props} />);
                
                const wrapper = component.find('.favourites-component');
                expect(wrapper.length).toBe(1);
            })

            it('Should render favourited films list', () => {
                const favouritedFilmsList = component.find('.favourited-films');
                expect(favouritedFilmsList.length).toBe(1);
            });
        
            it('Number of elements on the favourites films list should match passed number', () => {
                const favouritedFilm = component.find('.favourited-film-item');
                expect(favouritedFilm.length).toBe(props.favourites.films.length)
            });

            it('Should render favourited characters list', () => {
                const favouritedCharactersList = component.find('.favourited-characters');
                expect(favouritedCharactersList.length).toBe(1);
            });
        
            it('Number of elements on the favourites characters list should match passed number', () => {
                const favouritedCharacter= component.find('.favourited-character-item');
                expect(favouritedCharacter.length).toBe(props.favourites.characters.length)
            })
        })
    })

    describe('Component connected to the state', () => {
        describe('Favourites not passed to the component', () => {
            const expectedState = {
            };

            beforeEach(() => {
                component = mount(           
                    <Provider store={testStore()}>
                        <Favourites />
                    </Provider>);
            });

            it('Should render without problems', () => {
                const wrapper = component.find('.favourites-component');
                expect(wrapper.length).toBe(1);
            });

            it('State should be passed to the component', () => {
                const newState = testStore().getState();
                expect(newState).toStrictEqual(expectedState);
            });
    
            it('Should not render favourited films', () => {
                const favouritedFilmsList = component.find('.favourited-films');
                expect(favouritedFilmsList.text().length).toBe(0);
            });
            
            it('Should not render favourited characters', () => {
                const favouritedCharactersList = component.find('.favourited-characters');
                expect(favouritedCharactersList.text().length).toBe(0);
             })
        })

        describe('Favourites passed to the component', () => {

            const favourites = {
                films: [
                    {
                        title: 'Test title 2',
                        episode_id: 3,
                        url: 'https://swapi.dev/api/films/4/',
                        director: "Test test", 
                        producer: "Test producer", 
                        release_date: "1985-05-17"
                    },
                    {
                        title: 'Test title 1',
                        episode_id: 1,
                        url: 'https://swapi.dev/api/films/2/',
                        director: "Test test", 
                        producer: "Test producer", 
                        release_date: "1985-05-17"
                    }
                ],
                characters: [
                    {
                        "name": "Yoda",
                        "height": "123",
                        "mass": "123",
                        "hair_color": "test",
                        "skin_color": "test",
                        "eye_color": "test",
                        "birth_year": "test",
                        "gender": "test",
                        "url": "https://swapi.dev/api/people/1/" 
                }
                ]
            };
            const expectedState = {
                favourites: favourites
            };

            const testStore = () => makeMockStore(expectedState);

            beforeEach(() => {
                const state = {
                    favourites: favourites
                };
                component = mount(           
                    <Provider store={testStore(state)}>
                        <Router>
                            <Favourites {...testStore().getState()}/>
                        </Router>
                    </Provider>);
            })

            it('Should render without problems', () => {              
                const wrapper = component.find('.favourites-component');
                expect(wrapper.length).toBe(1);
            });

            it('State should be passed to the component', () => {
                const newState = testStore().getState();
                expect(newState).toStrictEqual(expectedState);
            });

            it('Should render favourited films list', () => {
                const favouritedFilmsList = component.find('.favourited-films');
                expect(favouritedFilmsList.length).toBe(1);
            });
        
            it('Number of elements on the favourites films list should match passed number', () => {
                const favouritedFilm = component.find('.favourited-film-item');
                expect(favouritedFilm.length).toBe(props.favourites.films.length)
            });

            it('Should render favourited characters list', () => {
                const favouritedCharactersList = component.find('.favourited-characters');
                expect(favouritedCharactersList.length).toBe(1);
            });
        
            it('Number of elements on the favourites characters list should match passed number', () => {
                const favouritedCharacter= component.find('.favourited-character-item');
                expect(favouritedCharacter.length).toBe(props.favourites.characters.length)
            })
        })
    })
});