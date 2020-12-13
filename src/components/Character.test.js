import React from 'react';
import Enzyme from "enzyme";
import { shallow, mount } from 'enzyme';
import { Character } from './Character';
import { Provider } from 'react-redux';
import { makeMockStore } from '../utils/testStore';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

const initialState = {};
const testStore = () => makeMockStore(initialState);

describe('Character Component', () => {

    let props;
    let component;
    
    describe('Component not connected to the state', () => {
        describe('Characters not passed to the component', () => {
            it('Should render without problems', () => {
                props = {
                };
                component = shallow(<Character {...props} />);
                
                const wrapper = component.find('.character-component');
                expect(wrapper.length).toBe(1);
            })

            describe('Characters loading', () => {
                beforeEach(() => {
                    props = {
                        charactersLoaded: false,
                    }

                    component = shallow(<Character {...props} />);
                })

                it('Should render characters loading message', () => {
                    const message = component.find('.no-data');
                    expect(message.length).toBe(1);
                    expect(message.text().includes('Loading character...')).toBe(true);
                });
    
                it('Should not render Character data', () => {
                    const characterData = component.find('.character-data-component');
                    expect(characterData.length).toBe(0);
                })
            })

            describe('Loading finished but no character found', () => {
                beforeEach(() => {
                    props = {
                        charactersLoaded: true,
                    };

                    component = shallow(<Character {...props} />);
                })

                it('Should render character not found message', () => {
                    const message = component.find('.no-data');
                    expect(message.length).toBe(1);
                    expect(message.text().includes('Character not found')).toBe(true);
                });

                it('Should not render Character data', () => {
                    const characterData = component.find('.character-data-component');
                    expect(characterData.length).toBe(0);
                })
            })

            it('Should not render Character data', () => {
                const characterData = component.find('.character-data-component');
                expect(characterData.length).toBe(0);
            })
        });

        describe('Character passed as props to the component', () => {

            const character = {
                    "name": "Yoda",
                    "height": "123",
                    "mass": "123",
                    "hair_color": "test",
                    "skin_color": "test",
                    "eye_color": "test",
                    "birth_year": "test",
                    "gender": "test",
                    "url": "https://swapi.dev/api/people/1/" 
            };

            it('Should render without problems', () => {
                props = {
                    currentCharacter: character,
                    charactersLoaded: false,
                    favourites: {
                        films: [],
                        characters: []                           
                    }
                };
                component = shallow(<Character {...props} />);
                
                const wrapper = component.find('.character-component');
                expect(wrapper.length).toBe(1);
            });

            describe('Characters are loading', () => {
                let component;

                it('Should render character loading message', () => {
                    props = {
                        charactersLoaded: false,
                    }
                    component = shallow(<Character {...props} />)

                    const message = component.find('.no-data');
                    expect(message.length).toBe(1);
                    expect(message.text().includes('Loading character...')).toBe(true);
                });
    
                it('Should render Character data', () => {
                    props = {
                        currentCharacter: character,
                        charactersLoaded: true,
                        favourites: {
                            films: [],
                            characters: []
                        }
                    };
                    
                    component = shallow(<Character {...props} />);
                    const wrapper = component.children();
                    const characterData = wrapper.find('.character-data-component');
                    expect(characterData.length).toBe(1);
                               
                })
            })
        })

    });

    describe('Component connected to the state', () => {

        describe('Character data not passed to the component', () => {

            const expectedState = {
            };

            beforeEach(() => {
                component = mount(           
                    <Provider store={testStore()}>
                        <Character />
                    </Provider>);
            });

            it('Should render without problems', () => {              
                const wrapper = component.find('.character-component');
                expect(wrapper.length).toBe(1);
            })

            it('State should be passed to the component', () => {
                const newState = testStore().getState();
                expect(newState).toStrictEqual(expectedState);
            });

            describe('Characters are loading', () => {
                beforeEach(() => {
                    const state = {
                        charactersLoaded: false,
                        currentCharacter: [],
                    }
                    component = mount(           
                        <Provider store={testStore(state)}>
                            <Character />
                        </Provider>);
                })

                it('Should render character loading message', () => {
                    const message = component.find('.no-data');
                    expect(message.length).toBe(1);
                    expect(message.text().includes('Loading character...')).toBe(true);
                });
    
                it('Should not render character data', () => {
                    const characterData = component.find('.character-data-component');
                    expect(characterData.length).toBe(0);
                })
            })
        })

        describe('Characters data is passed to the component', () => {

            const character = {
                "name": "Yoda",
                "height": "123",
                "mass": "123",
                "hair_color": "test",
                "skin_color": "test",
                "eye_color": "test",
                "birth_year": "test",
                "gender": "test",
                "url": "https://swapi.dev/api/people/1/" 
            };

            describe('Loading character', () => {
                it('Should render character loading message', () => {
                    const state = {
                        characterLoaded: false,
                        currentCharacter: character,
                        favourites: {
                            films: [],
                            characters: []
                        }
                    }
    
                    const testStore = () => makeMockStore(state);
                    component = mount(           
                        <Provider store={testStore()}>
                            <Character />
                        </Provider>);
    
                    const message = component.find('.no-data');
                    expect(message.length).toBe(1);
                    expect(message.text().includes('Loading character...')).toBe(true);
                });
            })

            const expectedState = {
                characterLoaded: true,
                currentCharacter: character,
                favourites: {
                    films: [],
                    characters: []
                }
            };

            const testStore = () => makeMockStore(expectedState);
            beforeEach(() => {
                component = mount(           
                    <Provider store={testStore()}>
                        <Character {...testStore().getState()} />
                    </Provider>);
            });

            it('Should render without problems', () => {
                const wrapper = component.find('.character-component');
                expect(wrapper.length).toBe(1);
            });

            it('State should be passed to the component', () => {
                const newState = testStore().getState();
                expect(newState).toStrictEqual(expectedState);
            });

            it('Should render character data', () => {
                const wrapper = component.children();
                const characterData = wrapper.find('.character-data-component');
                expect(characterData.length).toBe(1);                       
            })
        })
    })
})