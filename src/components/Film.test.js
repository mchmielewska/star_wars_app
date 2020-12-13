import React from 'react';
import Enzyme from "enzyme";
import { shallow, mount } from 'enzyme';
import { Film } from './Film';
import { Provider } from 'react-redux';
import { makeMockStore } from '../utils/testStore';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

const initialState = {};
const testStore = () => makeMockStore(initialState);

describe('Film Component', () => {

    let props;
    let component;
    
    describe('Component not connected to the state', () => {
        describe('Film not passed to the component', () => {
            it('Should render without problems', () => {
                props = {
                };
                component = shallow(<Film {...props} />);
                
                const wrapper = component.find('.film-component');
                expect(wrapper.length).toBe(1);
            })

            describe('Film loading', () => {
                beforeEach(() => {
                    props = {
                        filmsLoaded: false,
                    }

                    component = shallow(<Film {...props} />);
                })

                it('Should render film loading message', () => {
                    const message = component.find('.no-data');
                    expect(message.length).toBe(1);
                    expect(message.text().includes('Loading film...')).toBe(true);
                });
    
                it('Should not render film data', () => {
                    const filmData = component.find('.film-data-component');
                    expect(filmData.length).toBe(0);
                })
            })

            describe('Loading finished but no character found', () => {
                beforeEach(() => {
                    props = {
                        filmsLoaded: true,
                    };

                    component = shallow(<Film {...props} />);
                })

                it('Should render character not found message', () => {
                    const message = component.find('.no-data');
                    expect(message.length).toBe(1);
                    expect(message.text().includes('Film not found')).toBe(true);
                });

                it('Should not render Character data', () => {
                    const characterData = component.find('.film-data-component');
                    expect(characterData.length).toBe(0);
                })
            })

            it('Should not render Character data', () => {
                const characterData = component.find('.film-data-component');
                expect(characterData.length).toBe(0);
            })
        });

        describe('Film passed as props to the component', () => {

            const film = {
                title: 'Test title 2',
                episode_id: 3,
                url: 'https://swapi.dev/api/films/4/',
                director: "Test test", 
                producer: "Test producer", 
                release_date: "1985-05-17"
            };

            it('Should render without problems', () => {
                props = {
                    currentFilm: film,
                    filmsLoaded: false,
                    favourites: {
                        films: [],
                        characters: []                           
                    },
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
                        },
                        {
                            "name": "Greedo",
                            "height": "123",
                            "mass": "123",
                            "hair_color": "test",
                            "skin_color": "test",
                            "eye_color": "test",
                            "birth_year": "test",
                            "gender": "test",
                            "url": "https://swapi.dev/api/people/5/" 
                            },

                    ],
                };
                component = shallow(<Film {...props} />);
                
                const wrapper = component.find('.film-component');
                expect(wrapper.length).toBe(1);
            });

            describe('Films are loading', () => {
                let component;

                it('Should render film loading message', () => {
                    props = {
                        filmsLoaded: false,
                    }
                    component = shallow(<Film {...props} />)

                    const message = component.find('.no-data');
                    expect(message.length).toBe(1);
                    expect(message.text().includes('Loading film...')).toBe(true);
                });
    
                it('Should render Film data', () => {
                    props = {
                        currentFilm: film,
                        filmsLoaded: true,
                        favourites: {
                            films: [],
                            characters: []
                        },
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
                            },
                            {
                                "name": "Greedo",
                                "height": "123",
                                "mass": "123",
                                "hair_color": "test",
                                "skin_color": "test",
                                "eye_color": "test",
                                "birth_year": "test",
                                "gender": "test",
                                "url": "https://swapi.dev/api/people/5/" 
                                },

                        ],
                    };
                    
                    component = shallow(<Film {...props} />);
                    const wrapper = component.children();
                    const filmData = wrapper.find('.film-data-component');
                    expect(filmData.length).toBe(1);
                               
                })
            })
        })

    });

    describe('Component connected to the state', () => {

        describe('Film data not passed to the component', () => {

            const expectedState = {
            };

            beforeEach(() => {
                component = mount(           
                    <Provider store={testStore()}>
                        <Film />
                    </Provider>);
            });

            it('Should render without problems', () => {              
                const wrapper = component.find('.film-component');
                expect(wrapper.length).toBe(1);
            })

            it('State should be passed to the component', () => {
                const newState = testStore().getState();
                expect(newState).toStrictEqual(expectedState);
            });

            describe('Films are loading', () => {
                beforeEach(() => {
                    const state = {
                        filmsLoaded: false,
                        currentFilm: [],
                        favourites: {
                            films: [],
                            characters: []
                        },
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
                            },
                            {
                                "name": "Greedo",
                                "height": "123",
                                "mass": "123",
                                "hair_color": "test",
                                "skin_color": "test",
                                "eye_color": "test",
                                "birth_year": "test",
                                "gender": "test",
                                "url": "https://swapi.dev/api/people/5/" 
                                },

                        ],
                    }
                    component = mount(           
                        <Provider store={testStore(state)}>
                            <Film />
                        </Provider>);
                })

                it('Should render film loading message', () => {
                    const message = component.find('.no-data');
                    expect(message.length).toBe(1);
                    expect(message.text().includes('Loading film...')).toBe(true);
                });
    
                it('Should not render film data', () => {
                    const filmData = component.find('.film-data-component');
                    expect(filmData.length).toBe(0);
                })
            })
        })

        describe('Film data is passed to the component', () => {

            const film = {
                title: 'Test title 2',
                episode_id: 3,
                url: 'https://swapi.dev/api/films/4/',
                director: "Test test", 
                producer: "Test producer", 
                release_date: "1985-05-17"
            };

            describe('Loading film', () => {
                it('Should render film loading message', () => {
                    const state = {
                        filmsLoaded: false,
                        currentFilm: film,
                        favourites: {
                            films: [],
                            characters: []
                        },
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
                            },
                            {
                                "name": "Greedo",
                                "height": "123",
                                "mass": "123",
                                "hair_color": "test",
                                "skin_color": "test",
                                "eye_color": "test",
                                "birth_year": "test",
                                "gender": "test",
                                "url": "https://swapi.dev/api/people/5/" 
                                },

                        ]
                    };
    
                    const testStore = () => makeMockStore(state);
                    component = mount(           
                        <Provider store={testStore()}>
                            <Film />
                        </Provider>);
    
                    const message = component.find('.no-data');
                    expect(message.length).toBe(1);
                    expect(message.text().includes('Loading film...')).toBe(true);
                });
            })

            const expectedState = {
                filmsLoaded: true,
                currentFilm: film,
                favourites: {
                    films: [],
                    characters: []
                },
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
                    },
                    {
                        "name": "Greedo",
                        "height": "123",
                        "mass": "123",
                        "hair_color": "test",
                        "skin_color": "test",
                        "eye_color": "test",
                        "birth_year": "test",
                        "gender": "test",
                        "url": "https://swapi.dev/api/people/5/" 
                        },

                ],
            };

            const testStore = () => makeMockStore(expectedState);
            beforeEach(() => {
                component = mount(           
                    <Provider store={testStore()}>
                        <Film {...testStore().getState()} />
                    </Provider>);
            });

            it('Should render without problems', () => {
                const wrapper = component.find('.film-component');
                expect(wrapper.length).toBe(1);
            });

            it('State should be passed to the component', () => {
                const newState = testStore().getState();
                expect(newState).toStrictEqual(expectedState);
            });

            it('Should render film data', () => {
                const wrapper = component.children();
                const filmData = wrapper.find('.film-data-component');
                expect(filmData.length).toBe(1);                       
            })
        })
    })
})