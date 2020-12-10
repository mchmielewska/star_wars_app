import React from 'react';
import { shallow } from 'enzyme';

import Header from './Header';

const setUp = (props={}) => {
    const component = shallow(<Header {...props}/>);
    return component;
}

describe('Header Component', () => {

    let component;
    beforeEach(() => {
        component = setUp();
    })
    
    it('Should render without errors', () => {
        const wrapper = component.find('.header-component');
        expect(wrapper.length).toBe(1);
    });

    it('Should render nav', () => {
        const nav = component.find('.nav');
        expect(nav.length).toBe(1);
    });

    it('Should render H2', () => {
        const h2 = component.find('.nav-header');
        expect(h2.length).toBe(1);
    });

    it('Should render menu', () => {
        const menu = component.find('.nav-list');
        expect(menu.length).toBe(1);
    });
})
