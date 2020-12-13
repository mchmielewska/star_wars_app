import React from 'react';
import { shallow, mount } from 'enzyme';
import { FilmsList } from './FilmsList';
import { Provider } from 'react-redux';
import { makeMockStore } from '../utils/testStore';
import SingleFilm from './SingleFilm';

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



    })

    // it('Should render message if the films are not passed in props', () => {
    //     props = {
    //     }
    //     component = shallow(<FilmsList {...props}/>);
    //     const wrapper = component.find('.films-list');
    //     expect(wrapper.length).toBe(0);
    // });

    // describe('Should render without problems if props are passed', () => {

    //     beforeEach(() => {
    //         props = {
    //             title: 'Test title',
    //             episode_id: 4,
    //             url: 'https://swapi.dev/api/films/1/'
    //         }
    
    //         component = shallow(<FilmsList {...props}/>);
    //     })

    //     it('Should render component without problems', () => {
    //         const wrapper = component.find('.single-film-component');
    //         expect(wrapper.length).toBe(1);
    //     });

    //     it('Should render title without problems', () => {
    //         const title = component.find('.film-title');
    //         expect(title.length).toBe(1);
    //     });

    // })
})
