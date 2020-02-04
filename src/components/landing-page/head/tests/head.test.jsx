import React from 'react';
import expect from 'expect';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { head } from '../Head';

Enzyme.configure({ adapter: new Adapter() });

describe('head', () => {
    it('should exist', () => {
        const props = {
            lang: 'fa',
        };
        const component = shallow(
            <head {...props} />,
        );
        expect(component).toExist();
    });
});
