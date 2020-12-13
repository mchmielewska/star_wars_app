import React from 'react';
import Enzyme from 'enzyme';
import { shallow, mount } from 'enzyme';
import { makeMockStore } from '../utils/testStore';
import { Error } from './Error';
import { Provider } from 'react-redux';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });

const initialState = {};
const testStore = () => makeMockStore(initialState);

describe('Error component', () => {
    let props;
    let component;
    
    describe('Component not connected to the state', () => {
        describe('Errors not passed to the component', () => {
            it('Should render without problems', () => {
                props = {
                };
                component = shallow(<Error {...props} />);
                
                const wrapper = component.find('.error-component');
                expect(wrapper.length).toBe(1);
            })
    
            it('Should not render error message', () => {
                const favouritedFilmsList = component.find('#error');
                expect(favouritedFilmsList.text().length).toBe(0);
            });
        });

        describe('Errors are passed to the component', () => {
            it('Should render without problems', () => {
                props = {
                    errors: {
                        error: 'Test error message'
                    }
                };
                component = shallow(<Error {...props} />);
                
                const wrapper = component.find('.error-component');
                expect(wrapper.length).toBe(1);
            })
    
            it('Should render error message', () => {
                const favouritedFilmsList = component.find('#error');
                expect(favouritedFilmsList.text()).toStrictEqual('Error fetching data, please reload the page.');
            });
        })
    });

    describe('Component connected to the state', () => {

        describe('Errors not passed to the component', () => {
            const expectedState = {
            };
    
            beforeEach(() => {
                component = mount(           
                    <Provider store={testStore()}>
                        <Error />
                    </Provider>);
            });

            it('Should render without problems', () => {
                const wrapper = component.find('.error-component');
                expect(wrapper.length).toBe(1);
            });

            it('State should be passed to the component', () => {
                const newState = testStore().getState();
                expect(newState).toStrictEqual(expectedState);
            });

            it('Should not render error message', () => {
                const favouritedFilmsList = component.find('#error');
                expect(favouritedFilmsList.text().length).toBe(0);
            });
        });

        describe('Errors passed to the component', () => {
            const error = {
                error: 'Test error message'
            };
            const expectedState = {
                errors: error
            };

            const testStore = () => makeMockStore(expectedState);

            beforeEach(() => {
                const state = {
                    errors: error
                };
                component = mount(           
                    <Provider store={testStore(state)}>
                        <Error {...testStore().getState()}/>
                    </Provider>);
            });

            it('Should render without problems', () => {
                const wrapper = component.find('.error-component');
                expect(wrapper.length).toBe(1);
            });

            it('State should be passed to the component', () => {
                const newState = testStore().getState();
                expect(newState).toStrictEqual(expectedState);
            });

            it('Should render error message', () => {
                const favouritedFilmsList = component.find('#error');
                expect(favouritedFilmsList.text()).toStrictEqual('Error fetching data, please reload the page.');;
            });
        })
        
        
    })
})