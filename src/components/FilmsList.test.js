import React from 'react';
import Enzyme from "enzyme";
import { shallow, mount } from 'enzyme';
import { FilmsList } from './FilmsList';
import { Provider } from 'react-redux';
import { makeMockStore } from '../utils/testStore';
import { BrowserRouter as Router } from 'react-router-dom';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

const initialState = {};
const testStore = () => makeMockStore(initialState);

describe('Films List Component', () => {

    let props;
    let component;
    
    describe('Component not connected to the state', () => {
        describe('Films not passed to the component', () => {
            it('Should render without problems', () => {
                props = {};
                component = shallow(<FilmsList {...props} />);
                
                const wrapper = component.find('.films-component');
                expect(wrapper.length).toBe(1);
            })


            describe('Films are loading', () => {
                beforeEach(() => {
                    props = {
                        filmsLoaded: false
                    }

                    component = shallow(<FilmsList {...props} />);
                })

                it('Should render films loading message', () => {
                    const message = component.find('.no-data');
                    expect(message.length).toBe(1);
                    expect(message.text().includes('Loading films...')).toBe(true);
                });
    
                it('Should not render SingleFilm components', () => {
                    const singleFilm = component.find('.single-film-component');
                    expect(singleFilm.length).toBe(0);
                })
            })

            describe('Loading finished but no films found', () => {
                beforeEach(() => {
                    props = {
                        filmsLoaded: true
                    };

                    component = shallow(<FilmsList {...props} />);
                })

                it('Should render films not found message', () => {
                    const message = component.find('.no-data');
                    expect(message.length).toBe(1);
                    expect(message.text().includes('Films not found')).toBe(true);
                });

                it('Should not render SingleFilm components', () => {
                    const singleFilm = component.find('.single-film-component');
                    expect(singleFilm.length).toBe(0);
                })
            })

            it('Should not render SingleFilm components', () => {
                const singleFilm = component.find('.single-film-component');
                expect(singleFilm.length).toBe(0);
            })
        });

        describe('Films passed as props to the component', () => {

            const films = [
                {
                    title: 'Test title',
                    episode_id: 4,
                    url: 'https://swapi.dev/api/films/1/'
                }, 
                {
                    title: 'Test title 2',
                    episode_id: 3,
                    url: 'https://swapi.dev/api/films/4/'
                }
                , 
                {
                    title: 'Test title 3',
                    episode_id: 5,
                    url: 'https://swapi.dev/api/films/2/'
                }
            ];

            it('Should render without problems', () => {
                props = {
                    films: films,
                    filmsLoaded: false
                };
                component = shallow(<FilmsList {...props} />);
                
                const wrapper = component.find('.films-component');
                expect(wrapper.length).toBe(1);
            });

            describe('Films are loading', () => {
                let component;

                it('Should render films loading message', () => {
                    props = {
                        filmsLoaded: false,
                    }
                    component = shallow(<FilmsList {...props} />)

                    const message = component.find('.no-data');
                    expect(message.length).toBe(1);
                    expect(message.text().includes('Loading films...')).toBe(true);
                });
    
                it('Should render SingleFilm components - the count matching length of the props.films', () => {
                    props = {
                        filmsLoaded: true,
                        films: films
                    }
                    
                    component = mount(
                        <Router>
                            <FilmsList {...props} />
                        </Router>);

                    const filmsList = component.find('.films-list').children();
                    expect(filmsList.length).toBe(props.films.length);
                               
                })
            })
        })

    });

    describe('Component connected to the state', () => {

        describe('Films not passed to the component', () => {

            const expectedState = {
            };

            beforeEach(() => {
                component = mount(           
                    <Provider store={testStore()}>
                        <FilmsList />
                    </Provider>);
            });

            it('Should render without problems', () => {              
                const wrapper = component.find('.films-component');
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
                        films: []
                    }
                    component = mount(           
                        <Provider store={testStore(state)}>
                            <FilmsList />
                        </Provider>);
                })

                it('Should render films loading message', () => {
                    const message = component.find('.no-data');
                    expect(message.length).toBe(1);
                    expect(message.text().includes('Loading films...')).toBe(true);
                });
    
                it('Should not render SingleFilm components', () => {
                    const singleFilm = component.find('.single-film-component');
                    expect(singleFilm.length).toBe(0);
                })
            })
        })

        describe('Films are passed to the component', () => {

            describe('Loading films', () => {
                it('Should render films loading message', () => {
                    const state = {
                        filmsLoaded: true,
                        films: [
                            {
                                title: 'Test title',
                                episode_id: 4,
                                url: 'https://swapi.dev/api/films/1/'
                            }, 
                            {
                                title: 'Test title 2',
                                episode_id: 3,
                                url: 'https://swapi.dev/api/films/4/'
                            }
                        ]
                    }
    
                    const testStore = () => makeMockStore(state);
                    component = mount(           
                        <Provider store={testStore()}>
                            <FilmsList />
                        </Provider>);
    
                    const message = component.find('.no-data');
                    expect(message.length).toBe(1);
                    expect(message.text().includes('Loading films...')).toBe(true);
                });
            })

            const expectedState = {
                filmsLoaded: true,
                films: [
                    {
                        title: 'Test title',
                        episode_id: 4,
                        url: 'https://swapi.dev/api/films/1/'
                    }, 
                    {
                        title: 'Test title 2',
                        episode_id: 3,
                        url: 'https://swapi.dev/api/films/4/'
                    }
                ]
            };

            const testStore = () => makeMockStore(expectedState);
            beforeEach(() => {
                component = mount(           
                    <Provider store={testStore()}>
                        <Router>
                            <FilmsList {...testStore().getState()} />
                        </Router>
                    </Provider>);
            });

            it('Should render without problems', () => {
                const wrapper = component.find('.films-component');
                expect(wrapper.length).toBe(1);
            });

            it('State should be passed to the component', () => {
                const newState = testStore().getState();
                expect(newState).toStrictEqual(expectedState);
            });

            it('Should render SingleFilm components - the count matching length of the state.films', () => {
                const filmsList = component.find('.films-list').children();
                expect(filmsList.length).toBe(expectedState.films.length);                          
            })
        })
    })
})