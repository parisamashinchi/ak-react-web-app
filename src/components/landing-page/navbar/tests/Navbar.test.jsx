import React from 'react';
import expect from 'expect';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { NavBar } from '../NavBar';

Enzyme.configure({ adapter: new Adapter() });

describe('NavBar', () => {
    it('should exist', () => {
        const props = {
            lang: 'fa',
        };
        const component = shallow(
            <NavBar {...props} />,
        );
        expect(component).toExist();
    });
});
