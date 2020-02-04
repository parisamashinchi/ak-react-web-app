import React from 'react';
import expect from 'expect';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { LandingPage } from '../LandingPage';

Enzyme.configure({ adapter: new Adapter() });

describe('LandingPage', () => {
    it('should exist', () => {
        const props = {
            lang: 'fa',
        };
        const component = shallow(
            <LandingPage {...props} />,
        );
        expect(component).toExist();
    });
});
