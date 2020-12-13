import React from 'react';
import { shallow } from 'enzyme';
import SingleFilm from './SingleFilm';


describe('Single Film Component', () => {

    let props;
    let component;
    
    it('Should not render if the title is not passed in props', () => {
        props = {
        }
        component = shallow(<SingleFilm {...props}/>);
        const wrapper = component.find('.single-film-component');
        expect(wrapper.length).toBe(0);
    });

    describe('Should render without problems if props are passed', () => {

        beforeEach(() => {
            props = {
                title: 'Test title',
                episode_id: 4,
                url: 'https://swapi.dev/api/films/1/'
            }
    
            component = shallow(<SingleFilm {...props}/>);
        })

        it('Should render component without problems', () => {
            const wrapper = component.find('.single-film-component');
            expect(wrapper.length).toBe(1);
        });

        it('Should render title without problems', () => {
            const title = component.find('.film-title');
            expect(title.length).toBe(1);
        });

        it('Navigates to the correct page when the link is clicked', () => {

        })
    })
})
